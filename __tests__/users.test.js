const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mockUser = {
  email: 'mock@dummy.com',
  password: 'password',
};

describe('listing routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST to /users should create a new user', async () => {
    const { email } = mockUser;
    const res = await request(app).post('/api/v1/users').send(mockUser);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: expect.any(String), email });
  });

  afterAll(() => {
    pool.end();
  });
});
