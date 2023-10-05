const Collection = require('../models/Collections');
const { validationResult } = require('express-validator');
const validator = require('validator'); 

const collectionController = {
  
  createCollection: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email } = req.body;
  
      if (!name || !email) {
        return res.status(400).json({ error: 'Both name and email are required.' });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
      }
      const newCollection = await Collection.create(name, email);
  
      if (!newCollection) {
        return res.status(500).json({ error: 'Failed to create the collection.' });
      }
  
      res.status(201).json({ message: 'Collection is successfully created.', collection: newCollection });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create collection.' });
    }
  },
  

  getAllCollections: async (req, res) => {
    try {
      const collections = await Collection.getAll();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch collections.' });
    }
  },


  getCollectionById: async (req, res) => {
    try {
      const collectionId = req.params.id;
      const collection = await Collection.getById(collectionId);
      if (!collection) {
        res.status(404).json({ error: 'Collection not found.' });
      } else {
        res.json(collection);
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch collection.' });
    }
  },

  updateCollection: async (req, res) => {
    try {
      const collectionId = req.params.id;
      const newName = req.body.name;
      const newEmail = req.body.email;
  
      console.log('Collection ID:', collectionId);
      console.log('New Name:', newName);
      console.log('New Email:', newEmail);
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const collection = await Collection.getById(collectionId);
  
      console.log('Collection:', collection);
  
      if (!collection) {
        return res.status(404).json({ error: 'Collection not found.' });
      }
  
      console.log('Owner Email:', collection.owner_email);
  
      if (collection.owner_email !== newEmail) {
        console.log('Authorization Failed');
        return res.status(403).json({ error: 'Only the owner can edit this collection.' });
      }
  
      if (!newName) {
        console.log('New Name is Empty');
        return res.status(400).json({ error: 'New name is required.' });
      }

      console.log('Before Updating Collection');
  
      await Collection.updateNameAndEmail(collectionId, newName, newEmail);
  
      console.log('Collection Updated Successfully');
  
      res.json({ message: 'Collection name and email updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to update collection name and email.' });
    }
  },
  
  
  deleteCollection: async (req, res) => {
    try {
      const collectionId = req.params.id;
      await Collection.delete(collectionId);
      res.json({ message: 'Collection deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete collection.' });
    }
  },
};

module.exports = collectionController;
