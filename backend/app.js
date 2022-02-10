import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import Dotenv from 'dotenv';
import login from './routes/login.js';
import cookieParser from 'cookie-parser';
import auth from './routes/auth.js';
import search from './routes/search.js';
import post from './routes/post.js';
import board from './routes/board.js';
import mypage from './routes/mypage.js';
import home from './routes/home.js';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import findUser from './middlewares/findUser.js';

//env setting
Dotenv.config();

const app = express();

const __dirname = path.resolve();

//setting

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET, //암호화하는 데 쓰일 키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);

//Routes
app.use(findUser);
app.use('/login', login);
app.use('/auth', auth);
app.use('/search', search);
app.use('/post', post);
app.use('/board', board);
app.use('/mypage', mypage);
app.use('/', home);

try {
  app.listen(5000, () => {
    console.log('server connected');
    connectDB(process.env.MONGODB);
  });
} catch (error) {
  console.log(error);
}
