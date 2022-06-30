const { Router } = require('express');
const UserService = require('../services/UserService');

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
router.post('/sessions', async (req, res, next) => {
  try {
    console.log('body', req.body);
    const { email, password } = req.body;
    const user = await UserService.signIn({ email, password });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
