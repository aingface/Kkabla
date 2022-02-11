import React from 'react';
import styled from 'styled-components';
import { getStars } from './util/getStars';

function ReviewList({ isLogin, review }) {
  const anonymousName = '데이터'; //review.creator[0] + '*'.repeat(6);

  // Star 아이콘 렌더링 함수

  return (
    <List>
      <Score>
        <span>{getStars(review.star)}</span>
        <p style={{ fontWeight: 'bold' }}>{review.star}점</p>
      </Score>
      <Contents>
        <p className="writer">
          작성자 : <span>{anonymousName}</span>
          <span className="auth">{'수강생인증'}</span>
          <Date>{review.timeStamp}</Date>
        </p>
        <h3>"한 마디로 좋은 학원"</h3>
        <p className="content">
          <h4 className="title">장점</h4>
          <div>
            {isLogin
              ? `${review.pros}`
              : '로그인을 해주세요. 로그인을 해주세요. 로그인을 해주세요. 로그인을 해주세요.로그인을 해주세요. 로그인을 해주세요. (비회원일 경우 보이는 내용)'}
          </div>
        </p>
        <p className="content">
          <h4 className="title">단점</h4>
          <div>
            {isLogin
              ? `${review.cons}`
              : '로그인을 해주세요. 로그인을 해주세요. 로그인을 해주세요. 로그인을 해주세요.로그인을 해주세요. 로그인을 해주세요. (비회원일 경우 보이는 내용)'}
          </div>
        </p>
      </Contents>
    </List>
  );
}

const List = styled.div`
  margin-top: 1.5rem;
  border-top: solid 1px #52515120;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 2rem;
  color: #000000e1;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
  border-radius: 5px;
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  width: 5rem;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 1rem;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  .title {
    font-weight: bold;
    margin-bottom: 1.4rem;
    color: rgba(127, 170, 255, 0.9);
  }

  .writer {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
  }

  .auth {
    font-size: 0.8rem;
    background-color: #289628a7;
    padding: 0.3rem;
    border-radius: 5px;
    margin-left: 0.6rem;
    color: white;
  }

  .content {
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 3rem;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const Date = styled.span`
  margin-left: 1rem;
  font-size: 0.8rem;
`;

export default ReviewList;