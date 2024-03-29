import express from 'express';
import {
  createUser,
  sendSecurityCode,
  loginUser,
  checkUser,
  allUser,
  searchUser,
  searchUserData,
  checkDuplicate,
} from '../controllers/users.controller';
import { refreshToken } from '../controllers/token.controller';
import { upload } from '../config/multer';
const usersRouter = express.Router();

// 로그인
usersRouter.post('/login', loginUser);

// 로그인 유지
// usersRouter.get('/user', checkUser);

// 전체 유저
usersRouter.get('/users', allUser);

// 개별 유저 검색
usersRouter.get('/searchUser', searchUser);

// 개별 유저 데이터
usersRouter.get('/user', searchUserData);

// 아이디 중복 검사
usersRouter.get('/check', checkDuplicate);

// 회원가입
usersRouter.post('/signup', upload('profile').single('profileImage'), createUser);

// 보안메일
usersRouter.post('/signup/security-code', sendSecurityCode);

// 토큰 재발급
usersRouter.post('/refresh', refreshToken);

export { usersRouter };
