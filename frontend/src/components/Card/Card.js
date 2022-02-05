import React from 'react';
import { getStars } from '../review/util/getStars';
import styled from 'styled-components';

function Card({ item }) {
  const sumStars = item.review.reduce((acc, val) => {
    return acc + val.star;
  }, 0);

  const averageStars = (sumStars / item.review.length).toFixed(1);

  return (
    <>
      <Box style={{ backgroundColor: 'white', height: '250px' }}>
        <div style={{ width: '50%' }}>
          <img src={item.image} alt="logo" style={{ width: '100%' }} />
        </div>
        <div className="info">
          <h3>{item.name}</h3>
          <span>{getStars(averageStars)}</span>
          <p>{averageStars === 'NaN' ? '0.0' : averageStars}</p>
        </div>
      </Box>
    </>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 4rem;

  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: center;
  text-decoration: none;

  .info {
    p {
      font-weight: bold;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    font-weight: 500;
    color: rgba(50, 50, 50, 0.961);
  }
`;

export default Card;
