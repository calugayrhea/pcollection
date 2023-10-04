// photoController.js
const fs = require('fs');
const path = require('path');
const Collection = require('../models/Collections');
const Photo = require('../models/Photo');

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
          console.log('Exceeded maximum number of photos allowed.');
          return res.status(400).json({ error: 'Exceeded the maximum number of photos allowed.' });
        }
      }
      if (!collectionId) {
        return res.status(400).json({ error: 'Invalid collection ID.' });
      }
  
      for (const photo of req.files) {
        const photoPath = photo.path; 
        await Photo.create(collectionId, photoPath);
      }
  
      res.status(201).json({ message: 'Photos uploaded successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to upload photos.' });
    }
  },
  

  deletePhoto: async (req, res) => {
    try {
      const { collectionId, photoId } = req.params;

      const photo = await Photo.getById(photoId);
      if (!photo || photo.collection_id !== collectionId) {
        return res.status(404).json({ error: 'Photo not found.' });
      }
      fs.unlinkSync(photo.file_path);

      await Photo.delete(photoId);

      res.json({ message: 'Photo deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to delete the photo.' });
    }
  },
};

module.exports = photoController;
