import React, { useState, useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import Wrapper from './styles';
import CheckBox from '../WebModal/CheckBox';
import { CommonContext } from '../../context/CommonContext';

const EventModal = modalNum => {

  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);
  const { eventNum, setEventNum } = useContext(CommonContext);
  const [seletedItem, setSelectedItem] = useState();
  const RadioTest = (e) => {
    setSelectedItem(e.target.value)
    console.log(seletedItem);
  }

  return (
    <>
      <Wrapper>
        <Grid className="EM">
          <Grid container>
            <Grid className="eventM" item xs={5}>
              <img
                className="tmp"
                src={`../../${carouselDatas[eventNum].event_item["1"].prod_image}`}
                alt="nature"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              <input type="radio" name="event" value="A" onChange={RadioTest}></input>
              <p>
                <h3> 이곳은 설명 글 입니다.</h3>
              </p>
              {/* <CheckBox /> */}
            </Grid>

            <Grid item xs={2} className="textCss">
              <strong>VS</strong>
            </Grid>

            <Grid className="eventM" item xs={5}>
              <img
                className="tmp"
                src={`../../${carouselDatas[eventNum].event_item["2"].prod_image}`}
                alt="people"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              <input type="radio" name="event" value="B" onChange={RadioTest}></input>
              <p>
                <h3>이곳은 설명 글 입니다.</h3>
              </p>
            </Grid>
          </Grid>
          {/* <Grid>
            <CheckBox />
          </Grid> */}
          <Grid className="BtnCss">
            <Button
              variant="contained"
              color="primary"
              disableElevation
              // style={{ alignItems: 'center' }}
              onClick={() => modalNum.setModalNum(2)}
              disabled={seletedItem === undefined}
            >
              Disable elevation
            </Button>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default EventModal;
