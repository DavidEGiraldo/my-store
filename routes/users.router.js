const { Router } = require('express');
const UserService = require('../services/user.service');

const router = Router();
const service = new UserService();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  const users = service.find();
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send(users);
  }
});

module.exports = router;
