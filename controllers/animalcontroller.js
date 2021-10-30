const express = require("express");
const router = express.Router();
const { Animal } = require("../models");

// POSTING ANIMAL ENTRY
router.post("/create", async(req, res) => {
    const { name, legNumber, predator } = req.body.animal;

    const animalEntry = {
        name,
        legNumber,
        predator
    }
    try {
        const newAnimal = await Animal.create(animalEntry);
        res.status(200).json(newAnimal);
    } catch(err) {
        res.status(500).json({ error: err });
    }
    Animal.create(animalEntry)
})

// GETTING ALL ANIMAL ENTRIES
router.get("/", async(req, res) => {
    try {
        const entries = await Animal.findAll();
        res.status(200).json(entries);
    } catch(err) {
        res.status(500).json({ error: err });
    }
});

// DELETING ANIMAL ENTRIES
router.delete("/delete/:id", async(req, res) => {
    const animalId = req.params.id;

    try {
        const query = {
            where: {
                id: animalId
            }
        }

        await Animal.destroy(query);
        res.status(200).json({ message: "Animal entry deleted" })
    } catch(err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;