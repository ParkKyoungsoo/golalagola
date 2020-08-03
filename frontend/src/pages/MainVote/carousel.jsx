import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { CommonContext } from '../../context/CommonContext'

const ControlledCarousel = (props) => {
  const [index, setIndex] = useState(0);

  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // const RepresentativeItems = props
  // const selected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // // const CarouselDatas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // const CarouselDatas = [[],[],[],[],[],[],[],[],[],[],[],[],[]]
  // console.log(RepresentativeItems.RepresentativeItems)
  // const N = RepresentativeItems.RepresentativeItems.length


  // for(let i=0; i<N; i++) {
  //   if (selected[RepresentativeItems.RepresentativeItems[i].prod_category-1] < 2) {
  //     CarouselDatas[RepresentativeItems.RepresentativeItems[i].prod_category-1].push(RepresentativeItems.RepresentativeItems[i])
  //     selected[RepresentativeItems.RepresentativeItems[i].prod_category-1] = selected[RepresentativeItems.RepresentativeItems[i].prod_category-1] + 1
  //   }
  // }
  // console.log('CarouselDatas', CarouselDatas, CarouselDatas.length)
  // // console.log(CarouselDatas[0][0])


  return (
    <Carousel
      container
      activeIndex={index} onSelect={handleSelect}
    >
      {carouselDatas.map((TmpData, index) => (
        <Carousel.Item>
          <Grid container>
            <Grid item xs={6}>
              <Link className="KisokCentering" to={`VoteItemDetail/${TmpData.event_item["1"].prod_name}/${TmpData.event_item["1"].prod_id}`}>
                <img className="tmp" src={TmpData.event_item["1"].prod_image} alt="image1" />
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link className="KisokCentering" to={`VoteItemDetail/${TmpData.event_item["2"].prod_name}/${TmpData.event_item["2"].prod_id}`}>
                <img className="tmp" src={TmpData.event_item["2"].prod_image} alt="image2" />
              </Link>
            </Grid>
          </Grid>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
