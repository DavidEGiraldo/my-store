const { Router } = require('express');
const { faker } = require('@faker-js/faker');

const router = Router();

router.get('/', (req, res) => {
  const { size } = req.query;

  const createProduct = () => ({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.url(),
  });

  const products = faker.helpers.multiple(createProduct, {
    count: parseInt(size) || 10,
  });

  res.status(200).json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'not found',
    });
  } else {
    res.status(200).json({
      id,
      name: 'Test Product',
      price: 100,
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  if (!body.name || !body.price || !body.image) {
    res.status(400).json({
      message: 'bad request',
    });
  } else {
    res.status(201).json({
      message: 'created',
      data: body,
    });
  }
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!body.name || !body.price || !body.image) {
    res.status(400).json({
      message: 'bad request',
    });
  } else {
    res.status(200).json({
      message: 'updated',
      data: body,
      id,
    });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
