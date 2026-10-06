const request = require('supertest');
const { createApp } = require('../src/app');
const { validateAmount, MAX_AMOUNT_PAISE } = require('../src/ledger');

describe('GET /healthz', () => {
  it('answers 200 with status ok', async () => {
    const res = await request(createApp()).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /payments', () => {
  it('records a payment and returns the running total', async () => {
    const app = createApp();
    await request(app).post('/payments').send({ amount_paise: 100 });
    const res = await request(app).post('/payments').send({ amount_paise: 250 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ total_paise: 350 });
  });

  it('refuses a non-positive amount with a 400', async () => {
    const res = await request(createApp()).post('/payments').send({ amount_paise: 0 });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/positive/);
  });
});

describe('validateAmount', () => {
  it.each([
    [1, null],
    [49_900, null],
    [MAX_AMOUNT_PAISE, null],
  ])('accepts %d', (paise, want) => {
    expect(validateAmount(paise)).toBe(want);
  });

  it.each([
    [0],
    [-500],
    [1.5],
    [MAX_AMOUNT_PAISE + 1],
  ])('rejects %d', (paise) => {
    expect(validateAmount(paise)).not.toBeNull();
  });
});
