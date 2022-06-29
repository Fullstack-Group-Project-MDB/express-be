const { Router } = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
