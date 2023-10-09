
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

  updateNameAndEmail: (collectionId, newName, newEmail) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE collections SET name = ? WHERE id = ? AND owner_email = ?',
        [newName, collectionId, newEmail],
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

  delete: (collectionId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM collections WHERE id = ?',
        [collectionId],
        (err, result) => {
          if (err) {
            console.error('Error deleting collection:', err); 
            reject(err);
          } else {
            console.log('Collection deleted successfully'); 
            resolve(result);
          }
        }
      );
    });
  },  
};

module.exports = Collection;