// tests for user routes

const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('User Endpoints', () => {
    const testUser = {
        username: 'test',
        password: 'testpassword'
    };

    it('should throw user not created error', async () =>{
        const res = await request.post('/api/auth/signup').send({username: 'test'});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('User not created');
    })

    it('should create a new user', async () => {
        const res = await request.post('/api/auth/signup').send(testUser);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User created successfully');
    });

    it('should throw user not found error', async () =>{
        const res = await request.post('/api/auth/login').send({username: 'test1', password: 'testpassword'});
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('User not found');
    })

    it('should throw invalid credentials error', async () =>{
        const res = await request.post('/api/auth/login').send({username: 'test', password: 'testpassword1'});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid credentials');
    })

    it('should login with a registered user and return a token', async () => {
        const res = await request.post('/api/auth/login').send(testUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('User logged in successfully');
        expect(res.body).toHaveProperty('token');
    });

    it('should delete a user', async () => {
        const res = await request.delete('/api/auth/delete').send({username: 'test'});
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('User deleted successfully');
    });
});
