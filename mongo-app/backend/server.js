const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { MongoClient } = require("mongodb")
const dotenv = require('dotenv');
const app = express()
const port = 3000

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

const dbName = process.env.DB_NAME

app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findPassword = await collection.find({}).toArray();
    res.json(findPassword)
})

app.post('/', async (req, res) => {
    const password = req.body
    if (!password || typeof password !== 'object') {
        return res.status(400).send({ success: false, message: "Invalid password data" });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findPassword = await collection.insertOne(password);
        res.send({ success: true, result: findPassword });
    } catch (err) {
        console.error("Insert error:", err);
        res.status(500).send({ success: false, message: "Database error" });
    }

})

app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findPassword = await collection.deleteOne(password);
    res.send({ success: true, result: findPassword })
})

app.delete('/deleteAll', async (req, res) => {
    try {
        const password = req.body
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findPassword = await collection.deleteMany(password);
        res.send({ success: true, result: findPassword })
        res.status(200).json({ message: "All passwords deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete passwords" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})