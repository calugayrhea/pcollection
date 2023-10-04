// models/Photo.js
const db = require('../config/database');

const Photo = {
  create: (collectionId, filePath) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO photos (collection_id, file_path) VALUES (?, ?)',
        [collectionId, filePath],
        (err, result) => {
          if (err) {
            console.error('Error while creating photo:', err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

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

  getCountByCollectionId: (collectionId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT COUNT(*) AS count FROM photos WHERE collection_id = ?',
        [collectionId],
        (err, result) => {
          if (err) {
            console.error('Error while counting photos:', err);
            reject(err);
          } else {
            resolve(result[0].count);
          }
        }
      );
    });
  },
};

module.exports = Photo;
