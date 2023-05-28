# Menggunakan base image Python 3.7
FROM python:3.7-slim

# Set working directory di dalam kontainer
WORKDIR /app

# Menyalin file requirements.txt ke dalam kontainer
COPY requirements.txt .

# Menginstal dependensi yang dibutuhkan
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin file API-TensorFlow.py ke dalam kontainer
COPY API-TensorFlow.py .

# Menjalankan aplikasi API-TensorFlow.py
CMD ["python", "API-TensorFlow.py"]
