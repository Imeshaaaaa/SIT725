const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.get('/api/data', entryController.getAllEntries);
router.post('/create', entryController.createEntry);
router.delete('/delete/:id', entryController.deleteEntry);
router.put('/update/:id', entryController.updateEntry);

module.exports = router;
