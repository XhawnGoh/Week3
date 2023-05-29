const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const port = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'visitor_management';
const collectionName = 'visitors';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
let db;

MongoClient.connect(mongoUrl, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db(dbName);
});

// Create a new visitor
app.post('/visitors', (req, res) => {
  const visitor = req.body;

  db.collection(collectionName).insertOne(visitor, (err, result) => {
    if (err) {
      console.error('Failed to create visitor:', err);
      res.sendStatus(500);
      return;
    }
    res.status(201).json({ id: result.insertedId });
  });
});

// Get all visitors
app.get('/visitors', (req, res) => {
  db.collection(collectionName)
    .find()
    .toArray((err, visitors) => {
      if (err) {
        console.error('Failed to retrieve visitors:', err);
        res.sendStatus(500);
        return;
      }
      res.json(visitors);
    });
});

// Get visitor by ID
app.get('/visitors/:id', (req, res) => {
  const visitorId = new ObjectID(req.params.id);

  db.collection(collectionName).findOne({ _id: visitorId }, (err, visitor) => {
    if (err) {
      console.error('Failed to retrieve visitor:', err);
      res.sendStatus(500);
      return;
    }
    if (!visitor) {
      res.sendStatus(404);
      return;
    }
    res.json(visitor);
  });
});

// Update visitor details
app.put('/visitors/:id', (req, res) => {
  const visitorId = new ObjectID(req.params.id);
  const updateData = req.body;

  db.collection(collectionName).updateOne(
    { _id: visitorId },
    { $set: updateData },
    (err, result) => {
      if (err) {
        console.error('Failed to update visitor:', err);
        res.sendStatus(500);
        return;
      }
      if (result.modifiedCount === 0) {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(204);
    }
  );
});

// Delete a visitor
app.delete('/visitors/:id', (req, res) => {
  const visitorId = new ObjectID(req.params.id);

  db.collection(collectionName).deleteOne({ _id: visitorId }, (err, result) => {
    if (err) {
      console.error('Failed to delete visitor:', err);
      res.sendStatus(500);
      return;
    }
    if (result.deletedCount === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});