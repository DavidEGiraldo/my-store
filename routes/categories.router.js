const { Router } = require('express');

const router = Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.status(200).json({
    categoryId,
    productId,
  });
});

module.exports = router;
