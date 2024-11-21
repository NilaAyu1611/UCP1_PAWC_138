const express = require('express');
const router = express.Router();

let enclosures = [
    { id: 1, name: 'Kandang Harimau', capacity: 2, animalType: 'Harimau' },
    { id: 2, name: 'Kandang Gajah', capacity: 4, animalType: 'Gajah' },
];

// ** GET: Mendapatkan semua data kandang **
router.get('/', (req, res) => {
    res.json(enclosures);
});

// ** POST: Menambahkan kandang baru **
router.post('/', (req, res) => {
    const newEnclosure = {
        id: enclosures.length + 1,
        name: req.body.name,
        capacity: req.body.capacity || 0,
        animalType: req.body.animalType || 'Unknown',
    };
    enclosures.push(newEnclosure);
    res.status(201).json(newEnclosure);
});

// ** DELETE: Menghapus kandang berdasarkan ID **
router.delete('/:id', (req, res) => {
    const enclosureIndex = enclosures.findIndex(e => e.id === parseInt(req.params.id));
    if (enclosureIndex === -1) return res.status(404).json({ message: 'Kandang tidak ditemukan' });

    const deletedEnclosure = enclosures.splice(enclosureIndex, 1)[0];
    res.status(200).json({ message: `Kandang '${deletedEnclosure.name}' telah dihapus` });
});

// ** PUT: Memperbarui data kandang **
router.put('/:id', (req, res) => {
    const enclosure = enclosures.find(e => e.id === parseInt(req.params.id));
    if (!enclosure) return res.status(404).json({ message: 'Kandang tidak ditemukan' });

    enclosure.name = req.body.name || enclosure.name;
    enclosure.capacity = req.body.capacity || enclosure.capacity;
    enclosure.animalType = req.body.animalType || enclosure.animalType;

    res.status(200).json({
        message: `Kandang dengan ID ${enclosure.id} telah diperbarui`,
        updatedEnclosure: enclosure
    });
});

module.exports = router;
