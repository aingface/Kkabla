import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import ReviewList from '../components/review-page/ReviewList';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getStars } from '../utils/getStars';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DetailPage({ isLogin }) {
  const location = useLocation();
  const { data } = location.state;
  const [reviews, setReviews] = useState([]);

  console.log(data);
  const getReviews = async () => {
    await axios.get(`/board/review/${data._id}`).then((res) => {
      setReviews(res.data.review);
    });
  };

  useEffect(() => {
    getReviews();
  }, []);

  console.log(reviews);
  const list = reviews.map((review) => {
    return <ReviewList isLogin={isLogin} review={review} />;
  });

  return (
    <Container
      maxWidth="md"
      sx={{ marginBottom: '5rem', fontFamily: 'Pretendard-Regular' }}
    >
      <Top>
        <h2>
          {data.name}{' '}
          <span style={{ fontSize: '1rem', cursor: 'default' }}>
            리뷰게시판
          </span>
        </h2>
      </Top>
      <IntroBar>기관소개</IntroBar>
      <Introduction>
        <Info>
          <img src={data.image} alt="logo" />
          <div className="info">
            <h3>{data.name}</h3>
            <span>{getStars(data.star)}</span>
            <p>{data.star}점</p>
          </div>
        </Info>
        <Grid container spacing={3} sx={{ textAlign: 'left' }}>
          <Grid item xs={12}>
            <h4>홈페이지</h4>
            <a href={data.homePage} target="_blank" rel="noreferrer">
              {data.homePage}
            </a>
          </Grid>
          <Grid item xs={12}>
            <h4>위치</h4>
            <p>{data.location}</p>
          </Grid>
          <Grid item xs={12}>
            <h4>수업방식</h4>
            <p>{data.system} 방식</p>
          </Grid>
        </Grid>
      </Introduction>
      <ListTopBar>
        <div className="list-topbar">
          <h3>{reviews.length}개의 리뷰</h3>
          {isLogin && (
            <Link to={`/post/review/${data._id}`} state={{ data: data }}>
              <button>리뷰작성하기</button>
            </Link>
          )}
        </div>
      </ListTopBar>
      <Blind>
        <div className={!isLogin && 'close'}>
          {!isLogin && data.review.length !== 0 ? (
            <div className="blind">로그인 후 이용이 가능합니다. 😢</div>
          ) : null}
          {list}
        </div>
      </Blind>
    </Container>
  );
}

const Introduction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;

  h4 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: rgba(127, 170, 255, 0.9);
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-right: 2rem;

  img {
    width: 13rem;
  }

  .info {
    margin-top: 1rem;
  }

  h3 {
    margin-bottom: 0.4rem;
  }
`;

const ListTopBar = styled.div`
  margin-top: 6rem;

  .list-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h3 {
      font-weight: bold;
      color: #575757;
    }

    button {
      border: none;
      font-size: 1.1rem;
      font-weight: 500;
      background-color: rgba(127, 170, 255, 0.4);
      border-radius: 5px;
      padding: 0.5rem;
      color: #000000e1;
      cursor: pointer;

      &:hover {
        background-color: rgba(127, 170, 255, 1);
        transition-duration: 0.5s;
        color: white;
      }
    }
  }
`;

const Blind = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .close {
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    color: #4d4d4d;
  }

  .blind {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.036);
    width: 102%;
    height: 100%;
    z-index: 50;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const IntroBar = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #575757;
  margin-bottom: 1rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  margin-bottom: 4rem;
  align-items: center;
  border-bottom: solid 2px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.7rem;
    font-weight: bold;
    color: #484848ea;
    margin-bottom: 1rem;
  }

  span {
    font-size: 0.8rem;
    color: #484848ea;
    cursor: pointer;
  }
`;

export default DetailPage;
