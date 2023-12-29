const { Router } = require('express');
const CategoryService = require('../services/category.service')

const router = Router();
const service = new CategoryService()

router.get('/', (req, res) => {
  const categories = service.find()
  res.status(200).json(categories);
});

module.exports = router;
