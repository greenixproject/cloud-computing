const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Inisialisasi klien Google Cloud Storage
const storage = new Storage({
  keyFilename: './service-account-key.json',
});

// Nama bucket dan folder tujuan di GCS
const bucketName = 'model_ready';

// Fungsi untuk mengunggah file ke GCS
async function uploadToGCS(filePath, folderName) {
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
function searchFiles(dirPath, folderName) {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && path.extname(file) === '.h5') {
      uploadToGCS(filePath, folderName);
    } else if (stat.isDirectory()) {
      searchFiles(filePath, folderName);
    }
  });
}

// Menjalankan pencarian file dan mengunggahnya ke GCS
searchFiles(path.join(__dirname, '..', 'Food_Greenix', 'new_model'), 'model_activity/food_greenix');
searchFiles(path.join(__dirname, '..', 'Vehicle_Greenix'), 'model_activity/transportation_greenix');

// Fungsi untuk menghapus file dari GCS berdasarkan file yang ada di repo
async function deleteObsoleteFiles() {
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: 'model_activity' });

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
