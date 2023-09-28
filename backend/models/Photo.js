// models/Photo.js

const db = require('../config/database'); // Import the database connection

const Photo = {
  // Create a new photo in a collection
  create: (collectionId, photoUrl) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO photos (collection_id, photo_url) VALUES (?, ?)', [collectionId, photoUrl], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Retrieve all photos in a collection
  getAllByCollectionId: (collectionId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM photos WHERE collection_id = ?', [collectionId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Retrieve a single photo by ID
  getById: (photoId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM photos WHERE id = ?', [photoId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  // Update a photo's URL
  updateUrl: (photoId, newUrl) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE photos SET photo_url = ? WHERE id = ?', [newUrl, photoId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Delete a photo by ID
  delete: (photoId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM photos WHERE id = ?', [photoId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Add more methods as needed for your photos
};

module.exports = Photo;
