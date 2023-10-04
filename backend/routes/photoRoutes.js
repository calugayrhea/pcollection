// // routes/photoRoutes.js

// const express = require('express');
// const router = express.Router();
// const photoController = require('../controllers/photoController');
// const { body, validationResult } = require('express-validator');
// const multer = require('multer'); 

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, 
//   },
// });

// router.post(
//   '/collections/:collectionId/photos',
//   upload.single('photo'),
//   [
//     body('collectionId').notEmpty().withMessage('Collection ID is required.'),
//     body('photoUrl').notEmpty().withMessage('Photo URL is required.'),
//   ],
//   photoController.createPhoto
// );

// router.get('/collections/:collectionId/photos', photoController.getAllPhotosByCollectionId);

// router.delete('/collections/:collectionId/photos', photoController.deletePhoto);

// module.exports = router;