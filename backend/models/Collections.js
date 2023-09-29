// models/Collection.js

const db = require('../config/database'); // Import the database connection


const Collection = {
  create: (name, email) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO collections (name, owner_email) VALUES (?, ?)',
        [name, email],
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

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM collections', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getById: (collectionId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM collections WHERE id = ?', [collectionId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  updateNameAndEmail: (collectionId, newName, newEmail) => {
    return new Promise((resolve, reject) => {
      if (!newName) {
        reject(new Error('New name is required.'));
        return;
      }

      db.query('UPDATE collections SET name = ?, owner_email = ? WHERE id = ?', [newName, newEmail, collectionId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  delete: (collectionId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM collections WHERE id = ?', [collectionId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = Collection;
