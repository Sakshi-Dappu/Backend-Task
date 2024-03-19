// index.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/roommateDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const Property = require('./models/property');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log('Server is running on port', port);
});

// Route to render the property table
app.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.render('index.ejs', { properties });
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new roommate
app.get('/properties/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/properties', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.redirect('/properties');
  } catch (err) {
    console.error('Error saving property:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to view details of a specific property
app.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).send('Property not found');
      return;
    }
    res.render('show.ejs', { property });
  } catch (err) {
    console.error('Error fetching property details:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to edit details of a specific property
app.get('/properties/:id/edit', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).send('Property not found');
      return;
    }
    res.render('edit.ejs', { property });
  } catch (err) {
    console.error('Error fetching property details for edit:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.patch('/properties/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProperty) {
      res.status(404).send('Property not found');
      return;
    }
    res.redirect(`/properties/${req.params.id}`);
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a specific property
app.delete('/properties/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.redirect('/properties');
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).send('Internal Server Error');
  }
});
