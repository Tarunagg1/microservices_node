import request from 'supertest';
import app from '../../app';

it('should return 422 if the email is not valid', () => {
  request(app.get('/api/auth/signup'));
});

// beforeAll(() => { });

// beforeEach (() => { });

// afterAll(() => { });
