import express from 'express';
import Review from './reviewModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get all reviews
router.get('/', asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
}));

// Create a review
router.post('/', asyncHandler(async (req, res) => {
  await Review.create(req.body);
  res.status(201).json({ success: true, msg: 'Review successfully created.' });
}));

// Get reviews for a specific movie
router.get('/movie/:id', asyncHandler(async (req, res) => {
  const reviews = await Review.find({ movieId: req.params.id });
  res.status(200).json(reviews);
}));

export default router;