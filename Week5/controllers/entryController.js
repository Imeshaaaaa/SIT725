const entryService = require('../services/entryService');

const getAllEntries = async (req, res) => {
    try {
        const data = await entryService.getEntries();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Error fetching data" });
    }
};

const createEntry = async (req, res) => {
    try {
        await entryService.createEntry({ name: req.body.name, value: req.body.value });
        res.status(201).json({ message: "Entry added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating entry" });
    }
};

const deleteEntry = async (req, res) => {
    try {
        const result = await entryService.deleteEntry(req.params.id);
        if (result.deletedCount === 0) return res.status(404).json({ error: "Entry not found" });
        res.json({ message: "Entry deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting entry" });
    }
};

const updateEntry = async (req, res) => {
    try {
        const result = await entryService.updateEntry(req.params.id, req.body.value);
        if (result.modifiedCount === 0) return res.status(404).json({ error: "Entry not found or no changes made" });
        res.json({ message: "Entry updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating entry" });
    }
};

module.exports = { getAllEntries, createEntry, deleteEntry, updateEntry };
