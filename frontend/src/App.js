import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
//style
import styled from 'styled-components';
import { Reset } from 'styled-reset';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import ReviewPage from 'pages/ReviewPage';
import ReviewDetailPage from 'pages/DetailPage';
import BoardDetailPage from 'pages/BoardDetailPage';
import MainContents from 'components/mainPage/MainContents';
import FreeBoardPage from 'pages/FreeBoardPage';
import Login from 'components/login-page/Login';
import Logout from 'components/logout-page/Logout';
import MyPage from 'pages/myPage/MyPage';
import DevelopBoardPage from 'pages/DevelopBoardPage';
import AuthPage from 'pages/myPage/AuthPage';
import PostPage from 'pages/postPage/PostPage';
import SearchResult from 'components/SearchResult/SearchResult';
import AdminPage from 'pages/myPage/AdminPage';
import PostReviewPage from 'pages/postPage/PostReviewPage';
import MyPageMoreBoards from 'pages/myPage/MyPageMoreBoards';
import UpdatePage from 'pages/postPage/UpdatePage';
import AdminPageMoreComment from 'pages/myPage/AdminPageMoreComment';
import SearchResultSeeMore from 'components/SearchResult/SearchResultSeeMore';
import AdminPageMoreBoard from 'pages/myPage/AdminPageMoreBoard';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  const [isLogin, setisLogin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userAuth, setUserAuth] = useState([]);
  const getData = async () => {
    await axios
      .get('/mypage', {
        withCredentials: true,
      })
      .then((res) => {
        setUserAuth(res.data.userAuth);
        setIsAdmin(res.data.isAdmin);
      });
  };

  useEffect(() => {
    const getMe = async () => {
      await axios
        .get('/auth/user', {
          withCredentials: true,
        })
        .then((res) => {
          setisLogin(res.data);
          localStorage.setItem('nickName', JSON.stringify(res.data));
        });
    };
    getData();
    getMe();
  }, []);

  if (isLogin === null) {
    localStorage.removeItem('nickName');
  }

  return (
    <>
      <Reset />
      <Header isLogin={isLogin} isAdmin={isAdmin} />
      <ContentContainer>
        <Routes>
          <Route path="/logout" element={<Logout setisLogin={setisLogin} />} />
          {/* <Route path="/board" element={<BoardForm />} /> */}
          <Route path="/*" element={<MainContents isLogin={isLogin} />}></Route>
          {/* 검색 */}
          <Route
            path="/search/"
            element={<SearchResult isLogin={isLogin} />}
          ></Route>
          {/* 리뷰페이지 */}
          <Route
            path="/board/review"
            element={<ReviewPage isLogin={isLogin} />}
          ></Route>
          <Route
            path="/board/review/detail/:id"
            element={<ReviewDetailPage isLogin={isLogin} userAuth={userAuth} />}
          />
          {/* 자유게시판 */}
          <Route
            path="/board/free"
            element={<FreeBoardPage isLogin={isLogin} />}
          />
          <Route
            path="/board/free/:id"
            element={<BoardDetailPage isLogin={isLogin} isAdmin={isAdmin} />}
          />
          {/* 개발게시판 */}
          <Route
            path="/board/develop"
            element={<DevelopBoardPage isLogin={isLogin} />}
          />
          <Route
            path="/board/develop/:id"
            element={<BoardDetailPage isLogin={isLogin} isAdmin={isAdmin} />}
          />
          {/* 로그인 , 로그아웃 */}
          <Route
            path="/login"
            element={<Login setisLogin={setisLogin} isLogin={isLogin} />}
          />
          <Route path="/logout" element={<Logout setisLogin={setisLogin} />} />
          {isLogin && (
            <>
              {/* 리뷰게시판 글 작성 */}
              <Route
                path="/post/review/:id"
                element={<PostReviewPage isLogin={isLogin} />}
              ></Route>
              {/* 자유게시판 , 개발게시판 글 작성 */}
              <Route
                path="/post/:board"
                element={<PostPage isLogin={isLogin} />}
              ></Route>
              {/* 자유게시판 , 개발게시판 글 수정 */}
              <Route
                path="/board/free/update/:id"
                element={<UpdatePage isLogin={isLogin} />}
              />
              <Route
                path="/board/develop/update/:id"
                element={<UpdatePage isLogin={isLogin} />}
              />

              {/* 마이페이지 */}
              <Route
                path="/mypage"
                element={<MyPage isLogin={isLogin} />}
              ></Route>
              <Route
                path="/mypage/auth"
                element={<AuthPage isLogin={isLogin} />}
              ></Route>
              <Route
                path="/mypage/boards"
                element={<MyPageMoreBoards isLogin={isLogin} />}
              ></Route>
              <Route
                path="/mypage/likes"
                element={<MyPageMoreBoards isLogin={isLogin} />}
              ></Route>
            </>
          )}

          {isAdmin && (
            <>
              {/* 관리자 페이지 */}
              <Route
                path="/admin"
                element={<AdminPage isAdmin={isAdmin} />}
              ></Route>
              <Route
                path="/admin/board"
                element={<AdminPageMoreBoard isAdmin={isAdmin} />}
              ></Route>
              {/* <Route
                path="/admin/comment"
                element={<AdminPageMoreComment isAdmin={isAdmin} />}
              ></Route> */}
            </>
          )}
          <Route
            path="/search/"
            element={<SearchResult isLogin={isLogin} />}
          ></Route>
          <Route
            path="/search/seemore/"
            element={<SearchResultSeeMore isLogin={isLogin} />}
          ></Route>
          <Route
            path="/admin"
            element={<AdminPage isAdmin={isAdmin} />}
          ></Route>
          <Route
            path="/admin/board"
            element={<AdminPageMoreComment isAdmin={isAdmin} />}
          ></Route>
          <Route
            path="/admin/comment"
            element={<AdminPageMoreComment isAdmin={isAdmin} />}
          ></Route>
        </Routes>
      </ContentContainer>
      <Footer />
    </>
  );
}

const ContentContainer = styled.div`
  font-family: 'Pretendard-Regular';
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  min-height: 80vh;
  background-color: rgba(244, 244, 244, 0.5);
`;

export default App;
