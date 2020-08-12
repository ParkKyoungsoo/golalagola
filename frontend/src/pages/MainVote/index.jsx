import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../layout/';
import { Wrapper, MobileWrapper } from './styles';

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Divider,
  Grid,
  Paper,
  useMediaQuery,
  Dialog,
} from '@material-ui/core';

import Carousel from 'react-bootstrap/Carousel';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import ButtonBases from '../../components/Main/ButtonBases';
import VoteGridList from '../../components/Grid/VoteGridList';
import VoteGridTitle from '../../components/Grid/VoteGridTitle';

import ControlledCarousel from './carousel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
///////////////////////////////////////////////
// Vertical Carousel
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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

///////////////////////////////////////////////
// hook

const useGetCategoryDatas = url => {
  const { serverUrl, user, setUser } = useContext(CommonContext);
  const [data, setData] = useState([]);
  const { categoryDatas, setCategoryDatas } = useContext(CommonContext);

  const getDatas = async () => {
    let respone = [];

    setData(categoryDatas);
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
    console.log('clickclick');
    // 현재 선택된 거 기준 오른쪽 클릭
    if (newIndex > appbarIndex && newIndex !== categoryDatas.length - 1) {
      deltaValue = 1;
    }
    // 현재 선택된 거 기준 왼쪽 클릭
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
  const { drawerOpen, serverUrlBase, serverImgUrl, setDrawerOpen } = useContext(
    CommonContext,
  );
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const categoryDatas = useGetCategoryDatas('/category');

  const [flag, setFlag] = useState(false);

  const flagToggle = () => {
    setFlag(flag => !flag);
  };
  const [
    onChangeIndexHandler,
    appbarIndex,
    appbarIndexDelta,
  ] = useOnChangeIndex(categoryDatas);

  let history = useHistory();
  const isMobile = useMediaQuery('(max-width:930px)');
  useEffect(() => {
    setDrawerOpen(false);
  }, []);
  // 실시간 순위
  const [realtime, setRealTime] = useState([]);

  const onClickRedirectPathHandler = (name, id) => e => {
    window.scrollTo(0, 0);

    history.push(`/voteitemdetail/${name}/${id}`);
  };
  useEffect(() => {
    Axios.get(
      'https://i3b309.p.ssafy.io/api/coupon/realtime',
    ).then(({ data }) => setRealTime(data));
  }, []);
  // console.log(history.length)
  // const RepresentativeItems = SelectItem()
  return (
    <ViewContext.Provider
      value={{
        categoryDatas,
      }}
    >
      <Layout>
        {isMobile ? (
          <MobileWrapper>
            {/* carousel, 실시간 순위 */}
            <AppBar
              position="relative"
              color="inherit"
              className="appbar"
              style={{
                backgroundColor: '#f7f2f2',
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <ControlledCarousel />
                </Grid>
                <Grid
                  item
                  // md={2}
                  xs={12}
                  style={{
                    margin: '1vh 0 ',
                  }}
                >
                  <Box className="liveTimeBar">
                    <Grid>
                      <h3>실시간 순위</h3>
                    </Grid>
                    <Grid>
                      <CarouselProvider
                        naturalSlideWidth={1000}
                        naturalSlideHeight={300}
                        totalSlides={7}
                        orientation="vertical"
                        interval={3000}
                        isPlaying={true}
                        infinite={true}
                      >
                        <Grid>
                          <Slider>
                            {realtime.map((data, index) =>
                              index < 7 ? (
                                <Grid>
                                  <Slide
                                    key={index}
                                    style={{
                                      width: '200px',
                                      height: '50px',
                                    }}
                                  >
                                    <h3
                                      onClick={onClickRedirectPathHandler(
                                        data.prod_name,
                                        data.event_prod,
                                      )}
                                      style={{
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {index + 1}. {data.prod_name}
                                    </h3>
                                  </Slide>
                                </Grid>
                              ) : null,
                            )}
                          </Slider>
                        </Grid>
                      </CarouselProvider>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Divider style={{ margin: '0px 0 0px 0' }} />
              <Tabs
                value={appbarIndex + appbarIndexDelta}
                onChange={onChangeIndexHandler}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                aria-label="full width tabs example"
                className="big-indicator"
                style={{ margin: '1vh 0' }}
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
                key={index}
                value={appbarIndex}
                index={index}
                className="tab-panel"
              >
                <VoteGridList
                  categoryData={categoryData}
                  value={appbarIndex - 1}
                  index={index}
                  itemType={'vote'}
                />
              </TabPanel>
            ))}
          </MobileWrapper>
        ) : (
          <Wrapper
            onClick={() => {
              setDrawerOpen(0);
            }}
          >
            <Divider />
            <div className="KisokCentering">
              <h1 className="KisokCentering" style={{ height: '15vh' }}>
                Gola la Gola
              </h1>
            </div>
            <Divider />

            {/* carousel, 실시간 순위 */}
            <AppBar
              position="relative"
              color="inherit"
              className="appbar"
              style={{
                backgroundColor: '#f7f2f2',
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <ControlledCarousel />
                </Grid>

                <Grid
                  item
                  // md={2}
                  xs={12}
                  style={{
                    margin: '1vh 0 ',
                  }}
                >
                  <Box className="liveTimeBar">
                    <Grid>
                      <h2>실시간 순위</h2>
                    </Grid>
                    <Grid>
                      <CarouselProvider
                        naturalSlideWidth={1000}
                        naturalSlideHeight={150}
                        totalSlides={7}
                        orientation="vertical"
                        interval={3000}
                        isPlaying={true}
                        infinite={true}
                      >
                        <Grid>
                          <Slider>
                            {realtime.map((data, index) =>
                              index < 7 ? (
                                <Grid>
                                  <Slide
                                    key={index}
                                    style={{
                                      width: '300px',
                                      height: '50px',
                                    }}
                                  >
                                    <h2
                                      onClick={onClickRedirectPathHandler(
                                        data.prod_name,
                                        data.event_prod,
                                      )}
                                      style={{
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {index + 1}. {data.prod_name}
                                    </h2>
                                  </Slide>
                                </Grid>
                              ) : null,
                            )}
                          </Slider>
                        </Grid>
                        {/* <Grid>
                          <ButtonBack>
                            <p>
                              <ExpandLessIcon />
                            </p>
                          </ButtonBack>
                          <ButtonNext>
                            <p>
                              <ExpandMoreIcon />
                            </p>
                          </ButtonNext>
                        </Grid> */}
                      </CarouselProvider>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Divider style={{ margin: '0px 0 0px 0' }} />
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
                key={index}
                value={appbarIndex}
                index={index}
                className="tab-panel"
              >
                <VoteGridList
                  categoryData={categoryData}
                  value={appbarIndex - 1}
                  index={index}
                  itemType={'vote'}
                />
              </TabPanel>
            ))}
          </Wrapper>
        )}
      </Layout>
    </ViewContext.Provider>
  );
};

export default MainVote;
