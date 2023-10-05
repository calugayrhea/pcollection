const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const photoController = require('../controllers/photoController');
const Collection = require('../models/Collections');
const { body, validationResult } = require('express-validator');
const upload = require('../config/multerConfig'); 

router.post(
  '/collections',
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.'),
  ],
  collectionController.createCollection
);

router.get('/collections', collectionController.getAllCollections);

router.get('/collections/:id', collectionController.getCollectionById);

router.put(
  '/collections/:id',
  [
    body('name').notEmpty().withMessage('New name is required.'),
    body('email').notEmpty().withMessage('New email is required.').isEmail().withMessage('Invalid email address.'),
  ],
  collectionController.updateCollection
);

router.delete('/collections/:id', collectionController.deleteCollection);

router.post(
  '/collections/:collectionId/photos',
  upload.array('photos', 5),
  photoController.uploadPhotos
);

router.get('/collections/:collectionId/photos', photoController.getAllPhotosByCollectionId);

router.delete(
  '/collections/:collectionId/photos/:photoId',
  photoController.deletePhoto
);

module.exports = router;
