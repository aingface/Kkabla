import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';

InCommentInput.defaultProps = {
  author: 'default',
  content: '',
  data: {
    like: 0,
    're-comment': 0,
  },
};

function InCommentInput({ onCreate, author }) {
  const [inputVal, setInputVal] = useState(null);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    const newComment = {
      author,
      content: inputVal,
      data: {
        like: 0,
        're-comment': 0,
      },
    };
    onCreate(newComment);
    setInputVal('');
  };

  return (
    <Container>
      <TextField
        value={inputVal}
        onChange={handleChange}
        id="outlined-basic"
        label="댓글을 입력해주세요."
        variant="outlined"
        size="small"
        sx={{
          width: '100%',
          backgroundColor: 'white',
        }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        size="small"
        sx={{
          width: '10%',
          marginLeft: '1rem',
          backgroundColor: 'gray',
          height: '2.5rem',
        }}
      >
        등록
      </Button>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px 0;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default InCommentInput;
