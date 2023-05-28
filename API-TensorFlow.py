import tensorflow as tf
from flask import Flask, request

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Ambil data input dari permintaan POST
    data = request.get_json()

    # Lakukan prediksi menggunakan model TensorFlow
    # Ganti dengan logika prediksi yang sesuai dengan aplikasi Anda
    prediction = model.predict(data)

    # Mengembalikan hasil prediksi sebagai respons JSON
    return {'prediction': prediction}

if __name__ == '__main__':
    # Load model TensorFlow
    model = tf.keras.models.load_model('model.h5')
    app.run(host='0.0.0.0', port=8080)
