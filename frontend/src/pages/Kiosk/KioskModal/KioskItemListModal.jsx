import React, { useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import Wrapper from './styles';
import { CommonContext } from '../../../context/CommonContext';

const KioskItemModal = () => {
  const [index, setIndex] = useState(0);
  const [moveToNext, setMoveToNext] = useState(false);

  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { currentEventDatas, setCurrentEventDatas } = useContext(CommonContext);

  return (
    <Wrapper>
      <Grid>
        {currentEventDatas.map((Data, index) => (
          <Grid container>
            <Grid className="KisokCentering" item xs={6}>
              <img
                className="tmp"
                src={`https://i3b309.p.ssafy.io/${
                  Object(productDatas[Data.event_item['1'].prod_id - 1])
                    .prod_image
                }`}
                alt="image1"
              />
            </Grid>
            <Grid className="KisokCentering" item xs={6}>
              <img
                className="tmp"
                src={`https://i3b309.p.ssafy.io/${
                  Object(productDatas[Data.event_item['2'].prod_id - 1])
                    .prod_image
                }`}
                alt="image2"
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default KioskItemModal;
