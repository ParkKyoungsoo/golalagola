import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../layout/';
import Wrapper from './styles';

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Divider,
  Grid,
  Paper,
} from '@material-ui/core';

import Carousel from 'react-bootstrap/Carousel';

import Axios from 'axios';

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import ButtonBases from '../../components/Main/ButtonBases';
import VoteGridList from '../../components/Grid/VoteGridList';
import VoteGridTitle from '../../components/Grid/VoteGridTitle';

import categoryDats from './dump.json';

///////////////////////////////////////////////
// sub

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
};

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

// bootstrap carousel
function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://placeimg.com/320/100/any"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://placeimg.com/320/100/any"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://placeimg.com/320/100/any"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

///////////////////////////////////////////////
// hook

const useGetCategoryDatas = url => {
  const { serverUrl, user, setUser } = useContext(CommonContext);
  const [data, setData] = useState([]);

  const getDatas = async () => {
    let respone = [];

    setData(categoryDats);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return data;
};

const useOnChangeIndex = categoryDatas => {
  const [appbarIndex, setAppbarIndex] = useState(0);
  const [appbarIndexDelta, setAppbarIndexDelta] = useState(0);

  const onChangeIndexHandler = (event, newIndex) => {
    let deltaValue = 0;

    if (newIndex > appbarIndex && newIndex !== categoryDatas.length - 1) {
      deltaValue = 1;
    }
    if (newIndex < appbarIndex && newIndex !== 0) {
      deltaValue = -1;
    }
    if (appbarIndex === newIndex) {
      deltaValue = appbarIndexDelta * -1;
    }
    setAppbarIndexDelta(deltaValue);
    setAppbarIndex(newIndex);
  };

  return [onChangeIndexHandler, appbarIndex, appbarIndexDelta];
};

///////////////////////////////////////////////
// main

const MainVote = props => {
  const { drawerOpen, serverUrlBase, serverImgUrl } = useContext(CommonContext);

  const categoryDatas = useGetCategoryDatas('/category');

  const [
    onChangeIndexHandler,
    appbarIndex,
    appbarIndexDelta,
  ] = useOnChangeIndex(categoryDatas);

  return (
    <ViewContext.Provider
      value={{
        categoryDatas,
      }}
    >
      <Layout>
        <Wrapper>
          {/* carousel, 실시간 순위 */}
          <AppBar
            position="relative"
            color="inherit"
            className={drawerOpen ? 'appbar appbar-shift' : 'appbar'}
          >
            <Grid container>
              <Grid item md={9} xs={12}>
                <ControlledCarousel />
              </Grid>
              <Grid item md={3} xs={12} position="absolute">
                <Box height="100%" border={1} borderColor="secondary.main">
                  실시간 순위
                </Box>
              </Grid>
            </Grid>
            <Tabs
              value={appbarIndex + appbarIndexDelta}
              onChange={onChangeIndexHandler}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              aria-label="full width tabs example"
              className="big-indicator"
            >
              {categoryDatas.map((categoryData, index) => (
                <Tab
                  key={index}
                  {...a11yProps(index)}
                  label={
                    <ButtonBases
                      categoryData={categoryData}
                      isSelected={index === appbarIndex ? true : false}
                      serverUrlBase={serverUrlBase}
                      serverImgUrl={serverImgUrl}
                      index={index}
                    />
                  }
                  className="tab"
                ></Tab>
              ))}
            </Tabs>
            <Divider style={{ margin: '0px 0 0px 0' }} />
          </AppBar>

          {categoryDatas.map((categoryData, index) => (
            <TabPanel
              position="relative"
              key={index}
              value={appbarIndex}
              index={index}
              className="tab-panel"
            >
              <VoteGridList
                categoryData={categoryData}
                value={appbarIndex}
                index={index}
                itemType={'vote'}
              />
            </TabPanel>
          ))}
        </Wrapper>
      </Layout>
    </ViewContext.Provider>
  );
};

export default MainVote;
