// routes/photoRoutes.js

const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');


router.post('/photos', photoController.createPhoto);

router.get('/collections/:collectionId/photos', photoController.getAllPhotosByCollectionId);

router.get('/photos/:id', photoController.getPhotoById);

router.put('/photos/:id', photoController.updatePhotoUrl);

router.delete('/photos/:id', photoController.deletePhoto);

module.exports = router;
