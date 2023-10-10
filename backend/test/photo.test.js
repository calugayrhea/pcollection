/* eslint-env node */

const request = require('supertest');
const { app, startServer } = require('../server');
const db = require('../config/database');
const upload = require('../config/multerConfig');
const fs = require('fs'); 
const FormData = require('form-data');

let server;

beforeAll(() => {
  server = startServer();
});

afterAll((done) => {

  db.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    }
    server.close(done);
  });
});


describe('Upload Photos to Collection', () => {
    it('should upload photos to a collection', async () => {
      const collectionId = 1;
      const filePath = 'C:/Users/hp pc/Downloads/award/LOGO_MAKING_RHEA.jpeg';
  
      const formData = new FormData();
      formData.append('photos', fs.createReadStream(filePath));
  
      const response = await request(app)
        .post(`/api/collections/${collectionId}/photos`)
        .field('field', 'value')
        .attach('photos', filePath)
        .expect(400); 
    });
  
    it('should handle uploading an invalid file type', async () => {
      const collectionId = 1;
      const filePath = 'C:/Users/hp pc/Downloads/award/sample.jpg';
  
      const formData = new FormData();
      formData.append('photos', fs.createReadStream(filePath));
  
      const response = await request(app)
        .post(`/api/collections/${collectionId}/photos`)
        .field('field', 'value')
        .attach('photos', filePath)
        .expect(400);
    });


    describe('Get All Photos by Collection ID', () => {
        it('should retrieve all photos for a collection', async () => {
          const collectionId = 1; 
      
          const response = await request(app)
            .get(`/api/collections/${collectionId}/photos`)
            .expect(200);
      
          console.log(`Retrieved photos for collection ${collectionId}:`, response.body);
        });
      });

      
      describe('Delete Photo', () => {
        it('should delete a photo from a collection', async () => {
          const collectionId = 1; 
          const photoId = 1; 
      
          const response = await request(app)
            .delete(`/api/collections/${collectionId}/photos/${photoId}`)
            .send({ email: 'test@example.com' }) 
            .expect(200);
      
          console.log(`Deleted photo ${photoId} from collection ${collectionId}:`, response.body);
        });
      });
      

  });
  
  
  
  
  