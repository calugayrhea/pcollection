const Collection = require('../models/Collections');
const { validationResult } = require('express-validator');
const validator = require('validator');
const HttpStatus = require('../config/httpStatuscode');
const ErrorMessages = require('../config/errorMessages');

const collectionController = {
  createCollection: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
      }

      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: ErrorMessages.NAME_REQUIRED });
      }

      if (!validator.isEmail(email)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: ErrorMessages.INVALID_EMAIL });
      }

      const newCollection = await Collection.create(name, email);

      if (!newCollection) {
        return res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.SERVER_ERROR });
      }

      res.status(HttpStatus.CREATED).json({ message: ErrorMessages.SUCCESSFULLY_CREATED, collection: newCollection });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.SERVER_ERROR });
    }
  },

  getAllCollections: async (req, res) => {
    try {
      const collections = await Collection.getAll();
      res.status(HttpStatus.OK).json(collections);
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.SERVER_ERROR });
    }
  },

  getCollectionById: async (req, res) => {
    try {
      const collectionId = req.params.id;
      const collection = await Collection.getById(collectionId);
      if (!collection) {
        res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessages.COLLECTION_NOT_FOUND });
      } else {
        res.status(HttpStatus.OK).json(collection);
      }
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.SERVER_ERROR });
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
        return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
      }

      const collection = await Collection.getById(collectionId);

      console.log('Collection:', collection);

      if (!collection) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessages.COLLECTION_NOT_FOUND });
      }

      console.log('Owner Email:', collection.owner_email);

      if (collection.owner_email !== newEmail) {
        console.log('Authorization Failed');
        return res.status(HttpStatus.FORBIDDEN).json({ error: ErrorMessages.AUTHORIZATION_FAILED });
      }

      if (!newName) {
        console.log('New Name is Empty');
        return res.status(HttpStatus.BAD_REQUEST).json({ error: ErrorMessages.NAME_REQUIRED });
      }

      console.log('Before Updating Collection');

      await Collection.updateNameAndEmail(collectionId, newName, newEmail);

      console.log('Collection Updated Successfully');

      res.status(HttpStatus.OK).json({ message: ErrorMessages.SUCCESSFULLY_UPDATED });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.SERVER_ERROR });
    }
  },

  deleteCollection: async (req, res) => {
    try {
      const collectionId = req.params.id;
      await Collection.delete(collectionId);
      res.status(HttpStatus.OK).json({ message: ErrorMessages.SUCCESSFULLY_DELETED });
    } catch (error) {
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.SERVER_ERROR });
    }
  },
};

module.exports = collectionController;
