// The Express app, exported without binding a port so tests can drive it
// with supertest. The CI/CD briefs are about the pipeline around this
// service, not the service.
const express = require('express');
const { validateAmount } = require('./ledger');

function createApp() {
  const app = express();
  app.use(express.json());

  let totalPaise = 0;

  app.get('/healthz', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/payments', (req, res) => {
    const amount = req.body && req.body.amount_paise;
    const problem = validateAmount(amount);
    if (problem) {
      return res.status(400).json({ error: problem });
    }
    totalPaise += amount;
    res.json({ total_paise: totalPaise });
  });

  return app;
}

module.exports = { createApp };
