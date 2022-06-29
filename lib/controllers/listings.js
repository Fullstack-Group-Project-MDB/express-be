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

router.get('/:id', async (req, res, next) => {
  try {
    const listing = await Listing.getById(req.params.id);
    res.json(listing);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const listing = await Listing.insert({ ...req.body });
    res.json(listing);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const newListing = await Listing.updateById(req.params.id, req.body);
    res.json(newListing);
  } catch (error) {
    next(error);
  }
});
//

module.exports = router;
