import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Divider } from '@mui/material';

import Post from '../../components/post-page/Post';
import PostReview from '../../components/post-page/PostReview';
import { useParams } from 'react-router-dom';

function PostPage({ isLogin }) {
  // param으로 전달 된 board 따라서 게시판이 변경됨
  const param = useParams();
  const board = param.board;

  return (
    <PostContainer>
      <TopTypography variant="h5">글 작성하기</TopTypography>
      <Divider></Divider>
      {board === 'review' ? (
        <PostReview isLogin={isLogin} />
      ) : (
        <Post isLogin={isLogin} name={board} />
      )}
    </PostContainer>
  );
}

export default PostPage;

const PostContainer = styled(Container)`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin: 20px auto;
`;

const TopTypography = styled(Typography)`
  margin: 0 0 10px 10px;
  font-weight: bold;
`;
