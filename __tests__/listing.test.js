const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { post } = require('../lib/app');

describe('listing routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET request to /listings should return a list of listings', async () => {
    const res = await request(app).get('/api/v1/listings');

    expect(res.status).toBe(200);

    const lostDog = res.body.find((posts) => posts.title === 'Lost dog');
    expect(lostDog.content).toBe('Help I lost my dog');
    expect(res.body.length > 1).toBe(true);
  });
  afterAll(() => {
    pool.end();
  });
});
