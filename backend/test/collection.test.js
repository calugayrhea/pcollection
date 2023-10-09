const request = require('supertest');
const { app, startServer } = require('../server');
const db = require('../config/database');

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

describe('POST /api/collections', () => {
  it('should create a new collection', async () => {
    const response = await request(app)
      .post('/api/collections')
      .send({ name: 'Test Collection', email: 'test@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('collection');
  });

  it('should return an error if name is missing', async () => {
    const response = await request(app)
      .post('/api/collections')
      .send({ email: 'test@example.com' });
  
    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty('msg', 'Name is required.');
  });

  
  it('should return an error if email is invalid', async () => {
    const response = await request(app)
      .post('/api/collections')
      .send({ name: 'Test Collection', email: 'invalid-email' });
  
    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty('msg', 'Invalid email address.');
  });


  describe('GET /api/collections', () => {
    it('should retrieve all collections', async () => {
      const response = await request(app).get('/api/collections');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  
    it('should retrieve a specific collection by ID', async () => {
      const collectionIdToTest = 1; 
      const response = await request(app).get(`/api/collections/${collectionIdToTest}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name'); 
    });


    it('should return 404 if the collection does not exist', async () => {
      const nonExistentCollectionId = 999999; 
      const response = await request(app).get(`/api/collections/${nonExistentCollectionId}`);
      
      expect(response.status).toBe(404);
    });
  });
  

  describe('PUT /api/collections/:id', () => {
    it('should update a collection successfully', async () => {
      const collectionIdToTest = 1; 
      const updatedCollectionData = { name: 'Updated Collection ', email: 'test@example.com' };
  
      const response = await request(app)
        .put(`/api/collections/${collectionIdToTest}`)
        .send(updatedCollectionData);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Successfully updated.');
    });
  
    it('should return a 404 status if the collection to update does not exist', async () => {
      const nonExistentCollectionId = 999999; 
      const updatedCollectionData = { name: 'Updated Collection Name', email: 'test@example.com' };
  
      const response = await request(app)
        .put(`/api/collections/${nonExistentCollectionId}`)
        .send(updatedCollectionData);
  
      expect(response.status).toBe(404);
    });
  
    it('should return a 403 status if the user is not the owner of the collection', async () => {
      const collectionIdToTest = 1; 
      const updatedCollectionData = { name: 'Updated Collection Name', email: 'different-user@example.com' };
  
      const response = await request(app)
        .put(`/api/collections/${collectionIdToTest}`)
        .send(updatedCollectionData);
  
      expect(response.status).toBe(403);
    });
  
    it('should return a 400 status if the request body is invalid', async () => {
      const collectionIdToTest = 1; 
      const invalidCollectionData = { name: '', email: 'invalid-email' };
  
      const response = await request(app)
        .put(`/api/collections/${collectionIdToTest}`)
        .send(invalidCollectionData);
  
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/collections/:id', () => {
    it('should delete a collection and return 204 status code', async () => {
      const collectionIdToDelete = 9;
  
      const response = await request(app)
        .delete(`/api/collections/${collectionIdToDelete}`)
        .expect(204);
  
      expect(response.body).toEqual({});
    });

    it('should return a 404 status code if collection not found', async () => {
      const collectionIdToDelete = 999;
    
      const response = await request(app)
        .delete(`/api/collections/${collectionIdToDelete}`)
        .expect(404);
    
      expect(response.body).toEqual({ error: 'Collection not found.' }); // Update the expected value
    });
  });
});