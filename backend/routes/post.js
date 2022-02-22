import express from 'express';
import Board from '../models/Board.js';
import BootCamp from '../models/BootCamp.js';
import Review from '../models/Review.js';
import upload from '../utils/storage .js';
import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Admin from '../models/Admin.js';

const router = express.Router();

//리뷰 작성
router.post('/review/:id', async (req, res) => {
  const { title, pros, cons, star, creator } = req.body;
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const [b, r] = await Promise.all([
      BootCamp.findOne({ _id: id }),
      Review.findOne({ bootCamp: id, creator }),
    ]);

    if (r) {
      return res.send({ message: '이미 리뷰를 작성하였습니다.' });
    } else {
      const review = await Review.create({
        title,
        pros,
        cons,
        star,
        creator,
        bootCamp: b,
      });

      const s = (
        (b.star * b.review.length + star) /
        (b.review.length + 1)
      ).toFixed(1);

      const bootcamp = await BootCamp.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            review: {
              $each: [review._id],
              $position: 0,
            },
          },
          $set: {
            star: s,
          },
        },
      );
      return res.send(bootcamp);
    }
  }
});

//리뷰 수정하기
router.patch('/review/:bootCampId/:reviewId', async (req, res) => {
  const { title, pros, cons, star } = req.body;
  const { bootCampId, reviewId } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const review = await Review.findOneAndUpdate(
      { _id: reviewId },
      { title, pros, cons, star },
      {
        new: true,
      },
    );
    res.send(review);
  } else {
    res.send({ message: '해당 리뷰가 존재하지 않습니다.' });
  }
});

//리뷰 삭제하기
router.delete('/review/:bootCampId/:reviewId', async (req, res) => {
  const { bootCampId, reviewId } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const review = await Review.findOneAndDelete({ _id: reviewId });
    res.send(review);
  } else {
    res.send({ message: '해당 리뷰가 존재하지 않습니다.' });
  }
});

//개발 게시판 글 작성
router.post('/develop', upload.array('image'), async (req, res) => {
  const { title, contents, creator, type } = req.body;
  const images = req.files ? req.files.map((file) => file.location) : '';
  const board = await Board.create({
    title,
    contents,
    creator,
    images,
    type,
  });
  res.send(board);
});

//자유 게시판 글 작성
router.post('/free', async (req, res) => {
  const { title, contents, images, creator, type } = req.body;
  const board = await Board.create({ title, contents, creator, images, type });

  res.send(board);
});

//게시글 수정
router.patch('/board/:id', async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const board = await Board.findOneAndUpdate(
    { _id: id },
    {
      title,
      contents,
    },
  );
  res.send(board);
});

//게시글 삭제
router.delete('/board/:id', async (req, res) => {
  const { id } = req.params;

  const board = await Board.findOneAndDelete({
    _id: id,
    // $or: { creator: res.locals.user.nickName , res.locals.user.isAdmin ===},
  });

  res.send(board);
});

// 게시판 상세에서 댓글 달기
router.post('/board/comment/:id', async (req, res) => {
  const { contents } = req.body;
  const { id } = req.params;
  const b = await Board.find({ _id: id });

  const comments = await Comment.create({
    boardId: id,
    boardType: b[0].type,
    type: 'comment',
    creator: res.locals.user.nickName,
    contents,
  });
  const board = await Board.findOneAndUpdate(
    { _id: id },
    {
      $push: { comments },
    },
  ).lean();
  res.send(comments);
});

//게시판 상세에서 좋아요 누르기
router.post('/board/like/:id', async (req, res) => {
  const { id } = req.params;
  const user = res.locals.user;
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (!user) res.send({ message: '존재하지 않는 유저입니다.' });
    const boolean = await Board.findOne({
      _id: id,
      like: { $in: [user.nickName] },
    });

    if (boolean) {
      const board = await Board.findOneAndUpdate(
        { _id: id },
        { $pull: { like: { $in: [user.nickName] } } },
      );
      res.send(board);
    } else {
      const board = await Board.findOneAndUpdate(
        { _id: id },
        { $addToSet: { like: user.nickName } },
      );
      res.send(board);
    }
  } else {
    res.send({ message: '존재하지 않는 페이지입니다.' });
  }
});

//게시판 상세에서 신고하기
router.post('/board/report/:id', async (req, res) => {
  const { id } = req.params;
  const { nickName } = req.body;

  if (mongoose.Types.ObjectId.isValid(id)) {
    if (!nickName) return res.send({ message: '존재하지 않는 유저입니다.' });
    const board = await Board.findOneAndUpdate(
      { _id: id },
      { $addToSet: { report: [nickName] } },
    );

    if (board.report.length + 1 > 2) {
      await Promise.all([
        Admin.find({}).update({
          $addToSet: {
            reportBoard: [board._id],
          },
        }),
        Board.findOneAndUpdate({ _id: id }, { isBlind: true }),
      ]);
    }
    res.send(board);
  }
});

//댓글에 댓글 달기
router.post('/comment/comment/:id', async (req, res) => {
  const { contents } = req.body;
  const { id } = req.params;
  const b = await Comment.find({ _id: id });
  const comments = await Comment.create({
    type: 'reply',
    boardId: id,
    boardType: b[0].boardType,
    creator: res.locals.user.nickName,
    contents,
  });

  const comment = await Comment.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: { comments },
    },
  ).lean();

  res.send(comments);
});

//댓글 수정하기
router.patch('/comment/:id', async (req, res) => {
  const { contents } = req.body;
  const { id } = req.params;

  const comment = await Comment.findOneAndUpdate(
    { _id: id, creator: res.locals.user.nickName },
    {
      contents,
    },
    {
      new: true,
    },
  ).lean();
  res.send(comment);
});

//댓글 삭제하기
router.delete('/comment/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOneAndDelete({
    _id: id,
    creator: res.locals.user.nickName,
  }).lean();
  if (comment.type === 'reply') {
    const c = await Comment.findOneAndUpdate(
      {
        _id: comment.boardId,
      },
      {
        $pull: { comments: comment },
      },
    ).lean();
    return res.send(c);
  } else {
    const board = await Board.findOneAndUpdate(
      {
        _id: comment.boardId,
      },
      {
        $pull: { comments: comment._id },
      },
    ).lean();
    res.send(board);
  }
});

//댓글에 좋아요 누르기
router.get('/comment/like/:id', async (req, res) => {
  const { id } = req.params;
  const user = res.locals.user.nickName;
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (!user) res.send({ message: '존재하지 않는 유저입니다.' });
    const boolean = await Comment.findOne({ _id: id, like: { $in: [user] } });
    if (boolean) {
      const comment = await Comment.findOneAndUpdate(
        { _id: id },
        { $pull: { like: { $in: [user] } } },
      );
      res.send(comment);
    } else {
      const comment = await Comment.findOneAndUpdate(
        { _id: id },
        { $addToSet: { like: user } },
      );
      res.send(comment);
    }
  } else {
    res.send({ message: '존재하지 않는 페이지입니다.' });
  }
});

//댓글 신고하기
router.post('/comment/report/:id', async (req, res) => {
  const { id } = req.params;
  const { nickName } = req.body;

  if (mongoose.Types.ObjectId.isValid(id)) {
    if (!nickName) res.send({ message: '존재하지 않는 유저입니다.' });
    else {
      const comment = await Comment.findOneAndUpdate(
        { _id: id },
        { $addToSet: { report: [nickName] } },
      );

      if (comment.report.length + 1 > 2) {
        await Promise.all([
          Admin.find({}).update({
            $push: {
              reportComment: comment._id,
            },
          }),
          Comment.findOneAndUpdate({ _id: id }, { isBlind: true }),
        ]);
      }
      res.send(comment);
    }
  }
});

//어드민페이지에서 게시글 블라인드 취소하기
router.patch('/board/blindFalse/:id', async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const board = await Board.findOneAndUpdate(
      {
        _id: id,
      },
      {
        report: [],
        isBlind: false,
      },
    ).lean();
    res.send(board);
  }
});

//부트캠프 기관 등록하기
router.post('/bootcamp', async (req, res) => {
  const { name, location, image, homePage, system } = req.body;

  const bootCamp = await BootCamp.create({
    name,
    image,
    location,
    homePage,
    system,
    star: 0,
  });

  res.send(bootCamp);
});

router.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.file);
  const images = req.files ? req.files.map((file) => file.location) : '';
  res.send(images);
});

export default router;
