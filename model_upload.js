const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const tf = require('@tensorflow/tfjs-node'); // Anda perlu menginstal ini
const tfc = require('@tensorflow/tfjs-converter'); // Anda perlu menginstal ini

// Inisialisasi klien Google Cloud Storage
const storage = new Storage({
  keyFilename: './service-account-key.json',
});

// Nama bucket dan folder tujuan di GCS
const bucketName = 'model_ready';
const folderName = 'model_activity';

// Fungsi untuk mengunggah file ke GCS
async function uploadToGCS(filePath) {
  // Mengambil nama file dari path
  const fileName = path.basename(filePath);

  // Mengunggah file ke GCS
  const bucket = storage.bucket(bucketName);
  await bucket.upload(filePath, {
    destination: `${folderName}/${fileName}`,
  });
  console.log(`File ${fileName} berhasil diunggah ke GCS.`);
}

// Fungsi untuk mengkonversi model .h5 ke format SavedModel
async function convertModel(filePath) {
  const model = await tf.loadLayersModel(`file://${filePath}`);
  const savedModelPath = filePath.replace('.h5', '');
  await tfc.save(model, `file://${savedModelPath}`);
  return savedModelPath;
}

// Fungsi rekursif untuk mencari file dengan ekstensi .h5
async function searchFiles(dirPath) {
  fs.readdirSync(dirPath).forEach(async (file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && path.extname(file) === '.h5') {
      const savedModelPath = await convertModel(filePath);
      uploadToGCS(savedModelPath);
    } else if (stat.isDirectory()) {
      searchFiles(filePath);
    }
  });
}

// Menjalankan pencarian file dan mengunggahnya ke GCS
searchFiles(path.join(__dirname, '..'));

// Fungsi untuk menghapus file dari GCS berdasarkan file yang ada di repo
async function deleteObsoleteFiles() {
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: folderName });

  const repoFiles = fs.readdirSync(path.join(__dirname, '..'));

  for (const file of files) {
    const fileName = path.basename(file.name);
    if (!repoFiles.includes(fileName)) {
      await file.delete();
      console.log(`File ${fileName} dihapus dari GCS.`);
    }
  }
}

// Menjalankan penghapusan file yang tidak ada di repo
deleteObsoleteFiles();
