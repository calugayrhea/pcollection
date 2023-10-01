// routes/photoRoutes.js

const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');


router.post('/collections/:collectionId/photos', photoController.createPhoto);

router.get('/collections/:collectionId/photos', photoController.getAllPhotosByCollectionId);

router.delete('/collections/:collectionId/photos', photoController.deletePhoto);

module.exports = router;
