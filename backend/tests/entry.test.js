const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('POST /api/entries', () => {
  
  it('devrait refuser la création si aucun token n\'est fourni', async () => {
    const res = await request(app)
      .post('/api/entries')
      .send({
        date: "2026-02-01",
        mood: { status: "good" }
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('devrait refuser une entrée avec un mood invalide', async () => {
    const res = await request(app)
      .post('/api/entries')
      .send({
        date: "2026-02-01",
        mood: { status: "excellent" }
      });

    expect(res.statusCode).not.toBe(201);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});