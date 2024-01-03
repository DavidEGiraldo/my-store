const { Router } = require('express');
const UserService = require('../services/user.service');

const router = Router();
const service = new UserService();

router.get('/', async (req, res) => {
  const { limit, offset } = req.query;
  const users = await service.find();
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.json(users);
  }
});

module.exports = router;
