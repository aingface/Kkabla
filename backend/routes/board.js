import express from 'express';
import Board from '../models/Board.js';
import BootCamp from '../models/BootCamp.js';
import Review from '../models/Review.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import findUser from '../middlewares/findUser.js';

const router = express.Router();

//자유 게시판
router.get('/free', async (req, res) => {
  const borads = await Board.find({ type: 'free' }).sort({
    updatedTime: -1,
  });

  res.send(borads);
});

//자유 게시판 상세
router.get('/free/:id', async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const board = await Board.find({ _id: id }).populate('comments');
    res.send(board);
  }
});

//개발 이야기
router.get('/develop', async (req, res) => {
  const borads = await Board.find({ type: 'develop' }).sort({
    updatedTime: -1,
  });

  res.send(borads);
});

//개발 이야기 상세
router.get('/develop/:id', async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const board = await Board.find({ _id: id }).populate('comments');
    res.send(board);
  }
});

//리뷰 게시판
router.get('/review', async (req, res) => {
  const borads = await BootCamp.find({}).sort({
    updatedTime: -1,
  });
  res.send(borads);
});

//리뷰 게시판 상세
router.get('/review/:id', async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const bootCamp = await BootCamp.findOne({ _id: id }).populate('review');
    res.send(bootCamp);
  }
});

export default router;
