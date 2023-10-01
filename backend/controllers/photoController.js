const Photo = require('../models/Photo');
const Collection = require('../models/Collections');

const photoController = {
  createPhoto: async (req, res) => {
    try {
      const { collectionId, photoUrl } = req.body;
      
      const collection = await Collection.getById(collectionId);
      if (!collection) {
        return res.status(404).json({ error: 'Collection not found.' });
      }
      
      const currentPhotoCount = await Photo.getPhotoCount(collectionId);
      if (currentPhotoCount >= collection.max_photos) {
        return res.status(400).json({ error: 'Collection has reached its photo limit.' });
      }
      
      const uploadedFile = req.file; 
      if (!uploadedFile || uploadedFile.size > collection.max_file_size) {
        return res.status(400).json({ error: 'File size exceeds the limit.' });
      }
      const created_at = new Date();
      const newPhoto = await Photo.create(collectionId, photoUrl, created_at);
      
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
  
  deletePhoto: async (req, res) => {
    try {
      const collectionId = req.params.collectionId;
      const photoUrl = req.body.photoUrl;
      
      await Photo.delete(collectionId, photoUrl);
      
      res.json({ message: 'Photo deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete photo.' });
    }
  },
};

module.exports = photoController;
