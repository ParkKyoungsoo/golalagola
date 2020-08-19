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
  useMediaQuery,
  Menu,
  MenuItem,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import ButtonBases from '../../components/Main/ButtonBases';
import VoteGridList from '../../components/Grid/VoteGridList';

import ControlledCarousel from './carousel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
///////////////////////////////////////////////
// Vertical Carousel
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
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
  const [data, setData] = useState([]);
  const { categoryDatas, setCategoryDatas } = useContext(CommonContext);

  const getDatas = async () => {
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
    // console.log('clickclick');
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
  const { serverUrlBase, serverImgUrl, setDrawerOpen } = useContext(
    CommonContext,
  );
  const categoryDatas = useGetCategoryDatas('/category');

  const [
    onChangeIndexHandler,
    appbarIndex,
    appbarIndexDelta,
  ] = useOnChangeIndex(categoryDatas);

  let history = useHistory();
  const isMobile = useMediaQuery('(max-width:960px)');
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <Grid className="Centering">
              <Grid className="Centering" style={{ height: '15vh' }}>
                <img
                  // src="https://i3b309.p.ssafy.io/images/골라라골라.png"
                  src={`${serverImgUrl}골라라골라.png`}
                  className="Centering"
                  style={{ height: '100%' }}
                  alt="메인로고"
                />
              </Grid>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Grid
                item
                xs={7}
                style={{ border: '0.5px solid black' }}
                className="liveTimeBar "
              >
                <Grid className="Centering">
                  <p style={{ margin: 'auto' }}>실시간 순위</p>
                </Grid>

                <Grid className="Centering">
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
                                    width: '100px',
                                    height: '30px',
                                  }}
                                >
                                  <p
                                    onClick={onClickRedirectPathHandler(
                                      data.prod_name,
                                      data.event_prod,
                                    )}
                                    style={{
                                      cursor: 'pointer',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      lineHeight: '200%',
                                    }}
                                  >
                                    {index + 1}. {data.prod_name}
                                  </p>
                                </Slide>
                              </Grid>
                            ) : null,
                          )}
                        </Slider>
                      </Grid>
                    </CarouselProvider>
                  </Grid>
                  <Grid>
                    <p
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      style={{ margin: 'auto' }}
                    >
                      <KeyboardArrowDownIcon />
                    </p>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {realtime.map((data, index) =>
                        index < 7 ? (
                          <Grid key={index}>
                            <MenuItem
                              onClick={onClickRedirectPathHandler(
                                data.prod_name,
                                data.event_prod,
                              )}
                            >
                              <span
                                style={{
                                  cursor: 'pointer',
                                }}
                              >
                                {index + 1}. {data.prod_name}
                              </span>
                            </MenuItem>
                          </Grid>
                        ) : null,
                      )}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <AppBar
              position="relative"
              color="inherit"
              className="appbar"
              style={{
                backgroundColor: '#f2f2f2',
                margin: '1.5vh 0',
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <ControlledCarousel />
                </Grid>
              </Grid>
              <Divider />
            </AppBar>
            <Grid
              style={{
                position: 'sticky',
                top: '8vh',
                zIndex: '1',
                backgroundColor: '#f2f2f2',
              }}
            >
              <Tabs
                value={appbarIndex + appbarIndexDelta}
                onChange={onChangeIndexHandler}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                aria-label="full width tabs example"
                className="big-indicator"
                style={{
                  // border: '1px solid #e4d6cd',
                  background: '#ffffff',
                }}
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
                    style={{
                      margin: '0 1vw',
                      padding: '0 1vw',
                      background: '#e4d6cd',
                      borderRadius: '5%',
                    }}
                  ></Tab>
                ))}
              </Tabs>
            </Grid>
            {categoryDatas.map((categoryData, index) => (
              <TabPanel
                key={index}
                value={appbarIndex}
                index={index}
                className="tab-pansel"
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
            <Grid className="Centering">
              <Grid
                item
                md={9}
                className="Centering"
                style={{ height: '20vh' }}
              >
                <img
                  // src="https://i3b309.p.ssafy.io/images/골라라골라.png"
                  src={`${serverImgUrl}골라라골라.png`}
                  className="Centering"
                  style={{ height: '100%' }}
                  alt="메인로고"
                />
              </Grid>
            </Grid>
            {/* carousel, 실시간 순위 */}
            <Grid className="Centering">
              <Grid
                item
                md={9}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignContent: 'center',
                }}
              >
                <Grid
                  item
                  xs={4}
                  style={{ border: '0.5px solid black' }}
                  className="liveTimeBar "
                >
                  <Grid className="Centering">
                    <p style={{ margin: 'auto' }}>실시간 순위</p>
                  </Grid>

                  <Grid className="Centering">
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
                                <Grid key={index}>
                                  <Slide
                                    style={{
                                      width: '100px',
                                      height: '30px',
                                    }}
                                  >
                                    <p
                                      onClick={onClickRedirectPathHandler(
                                        data.prod_name,
                                        data.event_prod,
                                      )}
                                      style={{
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        lineHeight: '200%',
                                      }}
                                    >
                                      {index + 1}. {data.prod_name}
                                    </p>
                                  </Slide>
                                </Grid>
                              ) : null,
                            )}
                          </Slider>
                        </Grid>
                      </CarouselProvider>
                    </Grid>
                    <Grid>
                      <p
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ margin: 'auto' }}
                      >
                        <KeyboardArrowDownIcon />
                      </p>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {realtime.map((data, index) =>
                          index < 7 ? (
                            <Grid key={index}>
                              <MenuItem
                                onClick={onClickRedirectPathHandler(
                                  data.prod_name,
                                  data.event_prod,
                                )}
                              >
                                <span
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  {index + 1}. {data.prod_name}
                                </span>
                              </MenuItem>
                            </Grid>
                          ) : null,
                        )}
                      </Menu>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />

            <AppBar
              position="relative"
              color="inherit"
              className="appbar"
              style={{
                backgroundColor: '#f2f2f2',
                marginBottom: '10vh',
              }}
            >
              <Grid className="Centering">
                <Grid item md={9} container>
                  <Grid item xs={12}>
                    <ControlledCarousel />
                  </Grid>

                  <Grid
                    item
                    // md={2}
                    xs={12}
                    className=""
                    style={
                      {
                        // margin: '1vh 0 ',
                      }
                    }
                  ></Grid>
                </Grid>
              </Grid>
              <Divider style={{ margin: '0px 0 0px 0' }} />
            </AppBar>
            <Grid
              className="Centering"
              style={{
                position: 'sticky',
                top: '8vh',
                zIndex: '1',
              }}
            >
              <Grid
                item
                md={9}
                style={{
                  position: 'sticky',
                  top: '8vh',
                  zIndex: '1',
                  backgroundColor: '#ffffff',
                }}
              >
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
                      style={{
                        border: '1px solid #e4d6cd',
                        background: '#e4d6cd',
                        borderRadius: '5%',
                        padding: '0 0.5vw',
                      }}
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
              </Grid>
            </Grid>
            <Grid className="Centering">
              <Grid item md={9}>
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
              </Grid>
            </Grid>
          </Wrapper>
        )}
      </Layout>
    </ViewContext.Provider>
  );
};

export default MainVote;
