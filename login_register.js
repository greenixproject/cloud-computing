const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'greenix_capstone'
});

db.connect((err) => {
  if (err) {
    console.error('Kesalahan saat menghubungkan ke database MySQL:', err);
  } else {
    console.log('Terhubung ke database MySQL');
  }
});

app.use(express.json());

app.post('/register', (req, res) => {
  const {  email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Kesalahan saat menghash password:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mendaftar' });
    }

    const query = 'INSERT INTO user (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Kesalahan saat menyimpan pengguna baru:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mendaftar' });
      }

      res.status(201).json({ message: 'Pendaftaran berhasil' });
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM user WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Kesalahan saat mencari pengguna:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isPasswordValid) => {
      if (err) {
        console.error('Kesalahan saat membandingkan password:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat login' });
      }

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email atau password salah' });
      }

      const token = jwt.sign({ userId: user.id }, 'rahasia-kunci-jwt');

      res.json({ message: 'Login berhasil', token });
    });
  });
});

app.listen(8000, () => {
  console.log('Server berjalan di port 8000');
});
