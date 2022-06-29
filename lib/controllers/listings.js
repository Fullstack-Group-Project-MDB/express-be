const { Router } = require('express');
const Listing = require('../models/Listing');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const listings = await Listing.getAll();
    res.json(listings);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
