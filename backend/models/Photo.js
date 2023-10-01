// models/Photo.js
const db = require('../config/database');

const Photo = {
  create: (collectionId, photoUrl) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO photos (collection_id, photo_url, created_at) VALUES (?, ?, ?)',
      [collectionId, photoUrl, created], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
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

};

module.exports = Photo;
