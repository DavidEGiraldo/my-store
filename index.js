const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');

const {
  errorHandler,
  logErrors,
  boomErrorHandler,
  SQLErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};
app.use(cors(options));

app.get('/api/', (req, res) => {
  res.send('Hello, my server on Express.js');
});

routerApi(app);

app.use(logErrors);
app.use(SQLErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening on port:', port);
});
