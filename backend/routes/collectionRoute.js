const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const photoController = require('../controllers/photoController');
const Collection = require('../models/Collections');
const { body, validationResult } = require('express-validator');
const upload = require('../config/multerConfig'); 
const HttpStatus = require('../config/httpStatuscode');
const ErrorMessages = require('../config/errorMessages');

router.post(
  '/collections',
  [
    body('name').notEmpty().withMessage(ErrorMessages.NAME_REQUIRED),
    body('email')
      .notEmpty()
      .withMessage(ErrorMessages.EMAIL_REQUIRED)
      .isEmail()
      .withMessage(ErrorMessages.INVALID_EMAIL),
  ],
  collectionController.createCollection
);

router.get('/collections', collectionController.getAllCollections);

router.get('/collections/:id', collectionController.getCollectionById);

router.put(
  '/collections/:id',
  [
    body('name').notEmpty().withMessage(ErrorMessages.NAME_REQUIRED),
    body('email')
      .notEmpty()
      .withMessage(ErrorMessages.EMAIL_REQUIRED)
      .isEmail()
      .withMessage(ErrorMessages.INVALID_EMAIL),
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