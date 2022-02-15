import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ArticleCounts from '../Article/ArticleCounts';
import styled from 'styled-components';
import ReplyCommentList from './ReplyCommentList';
import { getRefinedDate } from '../../../utils/getRefinedDate';
import axios from 'axios';

function Comment({
  comment,
  isReplyComment,
  isLogin,
  setCommentList,
  setReplyList,
}) {
  console.log(comment);
  // 댓글 삭제 핸들러

  const handleDelete = async () => {
    await setCommentList((current) => {
      console.log(current);
      const newArr = [...current].filter((item) => {
        return item._id !== comment._id;
      });
      return newArr;
    });

    await axios.delete(`http://localhost:5000/post/comment/${comment._id}`, {
      withCredentials: true,
    });
  };

  console.log(comment);
  const [isClick, setIsClick] = useState(false);

  const handleInComment = () => {
    setIsClick(!isClick);
  };

  return (
    <CommentContainer>
      <Box
        sx={{
          width: '100%',
          minHeight: 60,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NonText>
          <AuthorText>{comment.creator}</AuthorText>
          <span className="date">{getRefinedDate(comment.createdAt)}</span>

          {JSON.parse(localStorage.getItem('nickName')) === comment.creator && (
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          )}
        </NonText>

        <Text>{comment.contents}</Text>
        {!isReplyComment && (
          <ArticleCounts
            size={'small'}
            likeCount={comment.like}
            commentCount={comment.comments}
            onClick={handleInComment}
            isReplyComment={isReplyComment}
          />
        )}
        {isClick && (
          <ReplyCommentList
            replyComments={comment.comments}
            isLogin={isLogin}
            comment={comment}
          />
        )}
      </Box>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  width: 100%;
  padding: 1.3rem;
  border-top: 1px solid #00000021;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    background-color: #dfdfdf2a;
  }
`;

const NonText = styled.div`
  display: flex;
  align-items: center;

  .date {
    margin-left: 1rem;
    font-size: 0.7rem;
    color: gray;
  }
`;

const Text = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const AuthorText = styled.div`
  color: black;
  font-weight: bold;
`;

const DeleteButton = styled.span`
  color: red;
  cursor: pointer;
  font-size: 0.7rem;
  margin-left: 1rem;
`;

export default Comment;
