const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'compassClone';
let db;

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);
    })
    .catch(err => console.error(err));

const getEntries = () => db.collection('entries').find().toArray();

const createEntry = (entry) => db.collection('entries').insertOne(entry);

const deleteEntry = (id) => db.collection('entries').deleteOne({ _id: new ObjectId(id) });

const updateEntry = (id, value) =>
    db.collection('entries').updateOne(
        { _id: new ObjectId(id) },
        { $set: { value } }
    );

module.exports = { getEntries, createEntry, deleteEntry, updateEntry };
