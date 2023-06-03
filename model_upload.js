const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

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

// Fungsi rekursif untuk mencari file dengan ekstensi .h5
function searchFiles(dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && path.extname(file) === '.h5') {
      uploadToGCS(filePath);
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
