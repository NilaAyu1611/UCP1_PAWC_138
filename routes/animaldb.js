const db = require('../database/db'); // Mengimpor koneksi database

// Mendapatkan semua data hewan
const getAllAnimals = (callback) => {
    db.query('SELECT * FROM hewan', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Mendapatkan data hewan berdasarkan ID
const getAnimalById = (id, callback) => {
    db.query('SELECT * FROM hewan WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback(new Error('Hewan tidak ditemukan'));
        }
        callback(null, results[0]);
    });
};

// Menambahkan hewan baru
const addAnimal = (name, species, birthDate, cageId, callback) => {
    db.query('INSERT INTO hewan (name, species, birthDate, cageId) VALUES (?, ?, ?, ?)', [name, species, birthDate, cageId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: results.insertId, name, species, birthDate, cageId });
    });
};

// Memperbarui data hewan
const updateAnimal = (id, name, species, birthDate, cageId, callback) => {
    db.query('UPDATE animals SET name = ?, species = ?, birthDate = ?, cageId = ? WHERE id = ?', [name, species, birthDate, cageId, id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Hewan tidak ditemukan'));
        }
        callback(null, { id, name, species, birthDate, cageId });
    });
};

// Menghapus data hewan
const deleteAnimal = (id, callback) => {
    db.query('DELETE FROM animals WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Hewan tidak ditemukan'));
        }
        callback(null);
    });
};

module.exports = {
    getAllAnimals,
    getAnimalById,
    addAnimal,
    updateAnimal,
    deleteAnimal
};
