/* eslint-env node */

const fs = require('fs');
// const path = require('path');
const Collection = require('../models/Collections');
const Photo = require('../models/Photo');
const HttpStatus = require('../config/httpStatuscode');
const ErrorMessages = require('../config/errorMessages');

const photoController = {
  uploadPhotos: async (req, res) => {
    try {
      const collectionId = req.params.collectionId;
      const currentPhotoCount = await Photo.getCountByCollectionId(collectionId);

      console.log('collectionId:', collectionId);
      console.log('Uploaded photos:', req.files);

      let uploadedPhotoCount = 0;

      for (const photo of req.files) {
        uploadedPhotoCount++;

        if (uploadedPhotoCount + currentPhotoCount > 5) {
          return res.status(HttpStatus.BAD_REQUEST).json({ error: ErrorMessages.MAX_PHOTOS_EXCEEDED });
        }
      }
      if (!collectionId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: ErrorMessages.INVALID_COLLECTION_ID });
      }

      for (const photo of req.files) {
        const photoPath = photo.path;
        await Photo.create(collectionId, photoPath);
      }

      res.status(HttpStatus.CREATED).json({ message: ErrorMessages.SUCCESSFULLY_CREATED });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.UNABLE_TO_UPLOAD });
    }
  },

  getAllPhotosByCollectionId: async (req, res) => {
    try {
      const collectionId = req.params.collectionId;
      const photos = await Photo.getAllByCollectionId(collectionId);
      res.status(HttpStatus.OK).json(photos);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.SERVER_ERROR });
    }
  },

  deletePhoto: async (req, res) => {
    try {
      const { collectionId, photoId } = req.params;
      const userEmail = req.body.email;

      console.log('Request Collection ID:', collectionId);
      console.log('Request Photo ID:', photoId);

      const photo = await Photo.getById(photoId);
      console.log('Photo:', photo);

      if (!photo) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessages.PHOTO_NOT_FOUND });
      }

      if (photo.collection_id !== parseInt(collectionId)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: ErrorMessages.MISMATCHED_COLLECTION_ID });
      }

      const collection = await Collection.getById(parseInt(collectionId));
      if (!collection) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessages.COLLECTION_NOT_FOUND });
      }

      if (collection.owner_email !== userEmail) {
        return res.status(HttpStatus.FORBIDDEN).json({ error: ErrorMessages.AUTHORIZATION_FAILED });
      }

      console.log('Attempting to delete file:', photo.file_path);
      fs.unlinkSync(photo.file_path);

      console.log('File deleted successfully:', photo.file_path);

      await Photo.delete(photoId);

      res.status(HttpStatus.OK).json({ message: ErrorMessages.SUCCESSFULLY_DELETED });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.SERVER_ERROR).json({ error: ErrorMessages.UNABLE_TO_DELETE });
    }
  },
};

module.exports = photoController;
