// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create a middleware that logs the request url, method and time
app.use((req, res, next) => {
  const date = new Date();
  console.log(`${date.toISOString()} | ${req.method} from ${req.url}`);
  next();
});

// Create a middleware that logs the request body
app.use((req, res, next) => {
  if (req.body) {
    console.log(`Request body: ${JSON.stringify(req.body)}`);
  }
  next();
});

// Create a middleware that logs the response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Response time: ${duration}ms`);
  });
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});