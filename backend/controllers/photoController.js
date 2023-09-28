// controllers/photoController.js

const Photo = require('../models/Photo');

const photoController = {
  createPhoto: async (req, res) => {
    try {
      const { collectionId, photoUrl } = req.body;
      const newPhoto = await Photo.create(collectionId, photoUrl);
      res.status(201).json({ message: 'Photo is successfully uploaded', photo: newPhoto });
    } catch (error) {
      res.status(500).json({ error: 'Unable to create photo.' });
    }
  },
  getAllPhotosByCollectionId: async (req, res) => {
    try {
      const collectionId = req.params.collectionId;
      const photos = await Photo.getAllByCollectionId(collectionId);
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch photos.' });
    }
  },

  getPhotoById: async (req, res) => {
    try {
      const photoId = req.params.id;
      const photo = await Photo.getById(photoId);
      if (!photo) {
        res.status(404).json({ error: 'Photo not found.' });
      } else {
        res.json(photo);
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch photo.' });
    }
  },
  updatePhotoUrl: async (req, res) => {
    try {
      const photoId = req.params.id;
      const newUrl = req.body.photoUrl;
      
      console.log('Received request to update photo with ID:', photoId);
      const existingPhoto = await Photo.getById(photoId);
      console.log('Existing photo:', existingPhoto);

      if (!existingPhoto) {
        console.log('Photo not found.');
        return res.status(404).json({ error: 'Photo not found.' });
      }

      await Photo.updateUrl(photoId, newUrl);
      console.log('Photo URL updated successfully.');
      res.json({ message: 'Photo URL updated successfully.' });
    } catch (error) {
      console.error('Error updating photo URL:', error);
      res.status(500).json({ error: 'Unable to update photo URL.' });
    }
  },
  deletePhoto: async (req, res) => {
    try {
      const photoId = req.params.id;
      await Photo.delete(photoId);
      res.json({ message: 'Photo deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete photo.' });
    }
  },
};

module.exports = photoController;
