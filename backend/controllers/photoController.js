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


  getAllPhotosByCollectionId: async (req, res) => {
    try {
      const collectionId = req.params.collectionId;
      const photos = await Photo.getAllByCollectionId(collectionId);
      res.status(200).json(photos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to retrieve photos by collection ID.' });
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
        console.log('Photo not found');
        return res.status(404).json({ error: 'Photo not found.' });
      }
  
      if (photo.collection_id !== parseInt(collectionId)) {
        console.log('Mismatched collectionId');
        return res.status(400).json({ error: 'Mismatched collectionId.' });
      }

      const collection = await Collection.getById(parseInt(collectionId));
      if (!collection) {
        console.log('Collection not found');
        return res.status(404).json({ error: 'Collection not found.' });
      }
  
      if (collection.owner_email !== userEmail) {
        console.log('Authorization Failed');
        return res.status(403).json({ error: 'Only the owner can delete photos in this collection.' });
      }

      console.log('Attempting to delete file:', photo.file_path);
      fs.unlinkSync(photo.file_path);
  
      console.log('File deleted successfully:', photo.file_path);
  
      await Photo.delete(photoId);
  
      res.json({ message: 'Photo deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to delete the photo.' });
    }
  },
};

module.exports = photoController;
