const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8080;

// Konfigurasi koneksi ke Google Cloud SQL
const connection = mysql.createConnection({
  host: '35.232.14.51', // Ganti dengan host Google Cloud SQL
  user: 'orang', // Ganti dengan pengguna Google Cloud SQL
  password: 'pass', // Ganti dengan kata sandi pengguna Google Cloud SQL
  database: 'data' // Ganti dengan nama basis data yang digunakan
});

connection.connect((err) => {
  if (err) {
    console.error('Koneksi ke Google Cloud SQL gagal: ', err);
    return;
  }
  console.log('Terhubung ke Google Cloud SQL');
});

// Endpoint untuk mendapatkan semua data
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM data', (err, results) => {
    if (err) {
      console.error('Gagal mendapatkan data: ', err);
      res.status(500).send('Gagal mendapatkan data');
      return;
    }
    res.json(results);
  });
});

// Endpoint untuk membuat data baru
app.post('/api/data', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO data (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      console.error('Gagal membuat data baru: ', err);
      res.status(500).send('Gagal membuat data baru');
      return;
    }
    res.json(results);
  });
});

// Endpoint untuk mengubah data
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  connection.query('UPDATE data SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
    if (err) {
      console.error('Gagal mengubah data: ', err);
      res.status(500).send('Gagal mengubah data');
      return;
    }
    res.json(results);
  });
});

// Endpoint untuk menghapus data
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM data WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Gagal menghapus data: ', err);
      res.status(500).send('Gagal menghapus data');
      return;
    }
    res.json(results);
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
