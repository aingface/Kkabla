import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import cryto from 'crypto';

const findUser = async (req, res, next) => {
  if (!req.cookies['auth_token']) {
    return res.send({ message: '로그인이 필요합니다.' });
  }

  try {
    const decode = jwt.verify(
      req.cookies['auth_token'],
      process.env.JWT_SECRET,
    );

    let user;

    if (decode.kakao_account) {
      user = await User.findOne({
        hashedEmail: 'Admin@admin123',
        hashedName: 'Admin',
      });
    } else {
      const hashedEmail = cryto
        .createHmac('sha256', process.env.SECRET)
        .update(decode.email)
        .digest('hex');

      const hashedName = cryto
        .createHmac('sha256', process.env.SECRET)
        .update(decode.name)
        .digest('hex');

      user = await User.findOne({
        hashedEmail,
        hashedName,
      });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.send({ message: '존재하지 않는 유저입니다.' });
  }
};

export default findUser;
