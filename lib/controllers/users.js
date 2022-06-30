const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');

const router = Router();
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

router.post('/sessions', async (req, res, next) => {
  try {
    const user = await UserService.signIn(req.body);
    res
      .cookie(process.env.COOKIE_NAME, user, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
      .json({ message: 'Signed in successfully!' });
  } catch (error) {
    next(error);
  }
});
router.get('/me', authenticate, (req, res) => {
  res.json(req.user);
});
router.post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res
      .cookie(process.env.COOKIE_NAME, user, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
      .json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
