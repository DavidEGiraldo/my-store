const { Router } = require('express');
const ProductService = require('../services/product.service')

const router = Router();
const service = new ProductService()

router.get('/', (req, res) => {
  const products = service.find()
  res.status(200).json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id)
  res.json(product)
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
