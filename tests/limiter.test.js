// tests for the rate limiter
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

let authToken;

const testUser = {
    username: 'test',
    password: 'test'
};

beforeAll(async () => {
    await request.post('/api/auth/signup').send(testUser);
    const response = await request.post('/api/auth/login').send(testUser);
    console.log(response.body.token);
    authToken = response.body.token;
});

describe('Rate Limiter', () => {
    it('should allow requests within the rate limit', async () => {
      const response = await Promise.all(
        Array.from({ length: 10 }).map(() => request.get('/api/notes').set('Authorization', `Bearer ${authToken}`).expect(200))
      );
      response.forEach((res) => {
        expect(res.status).toBe(200);
      });
    });
  
    it('should reject requests beyond the rate limit', async () => {
      const response = await Promise.all(
        Array.from({ length: 100 }).map(() => request.get('/api/notes').set('Authorization', `Bearer ${authToken}`))
      );
  
      expect(response[response.length - 1].status).toBe(429);
    });
  });