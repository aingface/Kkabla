import React, { useState, Children } from 'react';
import styled from 'styled-components';
import { Box, Rating, Grid } from '@mui/material';

function MyPageReviews({ content }) {
  const [reviews, setReviews] = useState(content);

  return (
    <>
      {reviews && (
        <>
          {Children.toArray(
            reviews.map((el) => (
              <GridContainer container>
                <Grid item xs={3}>
                  <RatingBox>
                    {el.ratings}
                    <ReviewRating
                      name="read-only"
                      value={el.ratings}
                      size="small"
                      readOnly
                    />
                  </RatingBox>
                </Grid>
                <Grid item xs={9}>
                  <RatingDate>{el.reviewDate}</RatingDate>
                  <RatingName>{el.part}</RatingName>
                </Grid>
              </GridContainer>
            )),
          )}
        </>
      )}
    </>
  );
}

export default MyPageReviews;

const GridContainer = styled(Grid)`
  background-color: #f4f4f4;
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
`;

const RatingBox = styled(Box)`
  text-align: center;
  margin: 26px 0;
  display: flex;
  flex-direction: column;
  justify-contents: center;
`;

const RatingDate = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  font-size: 12px;
`;

const RatingName = styled(Box)`
  text-align: center;
  line-height: 88px;
`;

const ReviewRating = styled(Rating)`
  justify-content: center;
`;
