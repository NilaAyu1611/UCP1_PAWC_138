const express = require('express');
const router = express.Router();

let animals = [
    { id: 1, name: 'Harimau', species: 'Panthera tigris', age: 5 },
    { id: 2, name: 'Gajah', species: 'Elephas maximus', age: 10 },
];

// ** GET: Mendapatkan semua data hewan **
router.get('/', (req, res) => {
    res.json(animals);
});

// ** POST: Menambahkan hewan baru **
router.post('/', (req, res) => {
    const newAnimal = {
        id: animals.length + 1,
        name: req.body.name,
        species: req.body.species,
        age: req.body.age || 0,
    };
    animals.push(newAnimal);
    res.status(201).json(newAnimal);
});

// ** DELETE: Menghapus hewan berdasarkan ID **
router.delete('/:id', (req, res) => {
    const animalIndex = animals.findIndex(a => a.id === parseInt(req.params.id));
    if (animalIndex === -1) return res.status(404).json({ message: 'Hewan tidak ditemukan' });

    const deletedAnimal = animals.splice(animalIndex, 1)[0];
    res.status(200).json({ message: `Hewan '${deletedAnimal.name}' telah dihapus` });
});

// ** PUT: Memperbarui data hewan **
router.put('/:id', (req, res) => {
    const animal = animals.find(a => a.id === parseInt(req.params.id));
    if (!animal) return res.status(404).json({ message: 'Hewan tidak ditemukan' });

    animal.name = req.body.name || animal.name;
    animal.species = req.body.species || animal.species;
    animal.age = req.body.age || animal.age;

    res.status(200).json({
        message: `Hewan dengan ID ${animal.id} telah diperbarui`,
        updatedAnimal: animal
    });
});

module.exports = router;
