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
  const isTablet = useMediaQuery('(max-width:960px)');
  return (
    <Wrapper>
      <div
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
          }}
        />
        <span
          className={
            isSelected ? 'image-backdrop selected-tab' : 'image-backdrop'
          }
        />
        <span className="image-button">
          <Typography
            component="span"
            variant="h6"
            className={isTablet ? 'mobile-image-title' : 'image-title'}
            style={isTablet ? { fontSize: '13px' } : null}
          >
            {categoryData.cat_title}
          </Typography>
        </span>
      </div>
    </Wrapper>
  );
};
export default ButtonBases;
