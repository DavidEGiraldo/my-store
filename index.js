const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, my server on Express.js');
});

routerApi(app);

app.listen(port, () => {
  console.log('Listening on port:', port);
});
