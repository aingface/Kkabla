import HotBootCampBoard from 'components/mainPage/BoardsCategory/HotBootCampBoard';
import BoardsWrapper from 'components/mainPage/BoardsCategory/BoardsWrapper';
import Banner from 'components/mainPage/BoardsCategory/Banner';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import mainPageDefaultData from 'components/defaultData/mainPageDefaultData';

export default function MainContents({ isLogin }) {
  const [totalBoards, setTotalBoards] = useState(mainPageDefaultData);

  useEffect(() => {
    const postReq = () => {
      axios
        .get('/', {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setTotalBoards(res.data);
        })
        .catch((err) => console.log(err));
    };
    postReq();
  }, []);

  return (
    <>
      <Banner></Banner>
      <Container>
        <HotBootCampBoard
          isLogin={isLogin}
          hotBootCamps={totalBoards?.bootCamps}
        />
        <BoardsWrapper
          isLogin={isLogin}
          freeBoard={totalBoards?.boards}
          developBoard={totalBoards?.develop}
          hotPostsBoard={totalBoards?.like}
        />
      </Container>
    </>
  );
}
