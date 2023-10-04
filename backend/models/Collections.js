// models/Collection.js

const db = require('../config/database'); 


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

  updateNameAndEmail: (collectionId, newName, newEmail, userEmailAddress) => {
    return new Promise(async (resolve, reject) => {
      try {
        const collection = await Collection.getById(collectionId);
  
        if (!collection) {
          reject(new Error('Collection not found.'));
          return;
        }
  
        if (collection.owner_email !== userEmailAddress) {
          reject(new Error('Only the owner can edit this collection.'));
          return;
        }
  
        if (!newName) {
          reject(new Error('New name is required.'));
          return;
        }
  
        db.query(
          'UPDATE collections SET name = ?, owner_email = ? WHERE id = ?',
          [newName, newEmail, collectionId],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
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
