import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import TmpDatas from './dump.json';
import { Grid, Flex } from '@material-ui/core';
import Wrapper from './styles';
import { Route, Link } from 'react-router-dom';


const click1 = () => {
  console.log("click A");
  //   return(
  //       <a href="/" onClick={function(e){
  //           e.preventDefault();
  //           this.props.onChangePage();
  //       }.bind(this)}>{this.props.title}</a>
  //   )
}
const click2 = () => {
  console.log("click B");
}

const clickTest = (i) => {
  console.log(i);
}

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Wrapper>
      <Carousel
        container
        activeIndex={index} onSelect={handleSelect}
      >
        {TmpDatas.map((TmpData, index) => (
          <Carousel.Item>
            <Grid container>
              <Grid className="KisokCentering" item xs={5}>
                <Link to={"/KioskDetails/" + TmpData.cat_title_1} >
                  <img className="tmp" src={TmpData.cat_img_url_1} alt="image1" onClick={click1} />
                </Link>
              </Grid>
              <Grid className="KisokCentering" item xs={2}>
                <h1>VS</h1>
              </Grid>
              <Grid className="KisokCentering" item xs={5}>
                <Link to={"/KioskDetails/" + TmpData.cat_title_2} >
                  <img className="tmp" src={TmpData.cat_img_url_2} alt="image2" onClick={click2} />
                </Link>
              </Grid>
            </Grid>
          </Carousel.Item>
        ))}
      </Carousel>
    </Wrapper>
  );
}

export default ControlledCarousel;
