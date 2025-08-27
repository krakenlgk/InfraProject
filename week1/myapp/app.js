const express = require('express');
const client = require('prom-client');
const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register });

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
