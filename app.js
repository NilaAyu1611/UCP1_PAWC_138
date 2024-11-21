const express = require('express');
const app = express();
const port = 3030; // Port untuk server
const todoRoutes = require('./routes/animaldb.js');
const expressLayout = require('express-ejs-layouts');
const db =  require('./database/db')
// Set up EJS sebagai view engine
app.set('view engine', 'ejs');


app.use(expressLayout);
// Middleware untuk menangani request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Halaman utama
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout',
        title: 'Halaman Utama'
    });
});

// Halaman Tentang Kami
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Tentang Kami'
    });
});

// Halaman Kontak
app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Hubungi Kami'
    });
});

// Halaman Daftar Hewan
app.get('/animal', (req, res) => {
    res.render('animal', {
        layout: 'layouts/main-layout',
        title: 'Daftar Hewan'
    });
});

// Halaman Daftar Kandang
app.get('/enclosures', (req, res) => {
    res.render('enclosures', {
        layout: 'layouts/main-layout',
        title: 'Daftar Kandang'
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
