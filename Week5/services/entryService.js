const entryModel = require('../models/entryModel');

const getEntries = () => entryModel.getEntries();

const createEntry = (entry) => entryModel.createEntry(entry);

const deleteEntry = (id) => entryModel.deleteEntry(id);

const updateEntry = (id, value) => entryModel.updateEntry(id, value);

module.exports = { getEntries, createEntry, deleteEntry, updateEntry };
