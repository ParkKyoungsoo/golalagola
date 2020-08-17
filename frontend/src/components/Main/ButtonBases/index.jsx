import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';
import Wrapper from './styles';

const ButtonBases = props => {
  const {
    categoryData,
    isSelected,
    serverImgUrl,
    categoeyXAxis,
    yAxis,
    index,
  } = props;

  const imgUrl = `${categoryData.cat_img_url}`;
  const isMobile = useMediaQuery('(max-width:930px)');
  return (
    <Wrapper style={{ border: 'none' }}>
      <div
        style={{ border: 'none' }}
        key={categoryData.cat_title}
        className={
          yAxis === 0 && categoeyXAxis === index
            ? 'image button-base selected-tab2'
            : 'image button-base'
        }
      >
        <span
          className="image-src"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'cover',
            // borderRadius: '8%',
          }}
        />
        <span
          className={
            isSelected ? 'image-backdrop selected-tab' : 'image-backdrop'
          }
          // catergory 색깔 정하는 곳입니다... 만세
          style={{
            backgroundColor: '#f2f2f2',
          }}
        />
        <span className="image-button">
          <Typography
            component="span"
            variant="h6"
            className={isMobile ? 'mobile-image-title' : 'image-title'}
          >
            {categoryData.cat_title}
          </Typography>
        </span>
      </div>
    </Wrapper>
  );
};
export default ButtonBases;
