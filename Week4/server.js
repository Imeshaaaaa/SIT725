const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// MongoDB setup
const url = 'mongodb://localhost:27017';
const dbName = 'compassClone';
let db;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);
    })
    .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API - fetch data
app.get('/api/data', (req, res) => {
    db.collection('entries')
        .find()
        .toArray()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

// Create
app.post('/create', (req, res) => {
    db.collection('entries')
        .insertOne({ name: req.body.name, value: req.body.value })
        .then(() => res.redirect('/'))
        .catch(err => console.error(err));
});

// Delete
app.post('/delete/:id', (req, res) => {
    db.collection('entries')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then(() => res.redirect('/'))
        .catch(err => console.error(err));
});

// Update
app.post('/update/:id', (req, res) => {
    db.collection('entries')
        .updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { value: req.body.value } }
        )
        .then(() => res.redirect('/'))
        .catch(err => console.error(err));
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
