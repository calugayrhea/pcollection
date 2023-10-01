const db = require('../config/database');

const Photo = {
  create: (collectionId, photoUrl, created_at) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO photos (collection_id, photo_url, created_at) VALUES (?, ?, ?)',
        [collectionId, photoUrl, created_at],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
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

  delete: (collectionId, photoUrl) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM photos WHERE collection_id = ? AND photo_url = ?', [collectionId, photoUrl], (err, result) => {
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
