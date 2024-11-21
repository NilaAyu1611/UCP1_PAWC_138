const db = require('../database/db'); // Mengimpor koneksi database

// Mendapatkan semua data kandang
const getAllEnclosures = (callback) => {
    db.query('SELECT * FROM enclosures', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Mendapatkan data kandang berdasarkan ID
const getEnclosureById = (id, callback) => {
    db.query('SELECT * FROM enclosures WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback(new Error('Kandang tidak ditemukan'));
        }
        callback(null, results[0]);
    });
};

// Menambahkan kandang baru
const addEnclosure = (name, capacity, type, callback) => {
    db.query('INSERT INTO enclosures (name, capacity, type) VALUES (?, ?, ?)', [name, capacity, type], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: results.insertId, name, capacity, type });
    });
};

// Memperbarui data kandang
const updateEnclosure = (id, name, capacity, type, callback) => {
    db.query('UPDATE enclosures SET name = ?, capacity = ?, type = ? WHERE id = ?', [name, capacity, type, id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Kandang tidak ditemukan'));
        }
        callback(null, { id, name, capacity, type });
    });
};

// Menghapus data kandang
const deleteEnclosure = (id, callback) => {
    db.query('DELETE FROM enclosures WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Kandang tidak ditemukan'));
        }
        callback(null);
    });
};

module.exports = {
    getAllEnclosures,
    getEnclosureById,
    addEnclosure,
    updateEnclosure,
    deleteEnclosure
};
