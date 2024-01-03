// tests for notes routes
const supertest = require('supertest')
const app = require('../app');

const request = supertest(app)

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

describe('Note Endpoints', () => {
    let noteId;
    // console.log(authToken);

    it('should create a new note', async () => {
        const response = await request.post('/api/notes').set('Authorization', `Bearer ${authToken}`).send({
            title: 'test note',
            body: 'test body'
        });
        expect(response.status).toBe(201);
        expect(response.body.note.title).toBe('test note');
        expect(response.body.note.body).toBe('test body');
        noteId = response.body.note._id;
    });

    it('should get all notes', async () => {
        const response = await request.get('/api/notes').set('Authorization', `Bearer ${authToken}`);
        expect(response.status).toBe(200);
        expect(response.body.notes.length).toBe(1);
    });

    it('should get a note by id', async () => {
        const response = await request.get(`/api/notes/${noteId}`).set('Authorization', `Bearer ${authToken}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.note.title).toBe('test note');
    });

    it('should update a note by id', async () => {
        const response = await request.put(`/api/notes/${noteId}`).set('Authorization', `Bearer ${authToken}`).send({title: 'updated note', body: 'updated body'})
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Note updated successfully');
        expect(response.body.note.title).toBe('updated note');
        expect(response.body.note.body).toBe('updated body');
    });

    it('should search notes based on keywords', async () => {
        const response = await request.get('/api/search?q=body').set('Authorization', `Bearer ${authToken}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('updated note');
    });

    it('should delete a specific note by ID', async () => {
        const response = await request.delete(`/api/notes/${noteId}`).set('Authorization', `Bearer ${authToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Note deleted successfully');
    });
});

afterAll(async () => {
    await request.delete('/api/auth/delete').send({username: 'test'});
});