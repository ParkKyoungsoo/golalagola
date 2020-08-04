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
  useMediaQuery,
  Dialog,
} from '@material-ui/core';

import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import ButtonBases from '../../components/Main/ButtonBases';
import VoteGridList from '../../components/Grid/VoteGridList';
import VoteGridTitle from '../../components/Grid/VoteGridTitle';

import ControlledCarousel from './carousel';
///////////////////////////////////////////////

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
  const { productDatas, setProductDatas } = useContext(CommonContext);
  const { carouselDatas, setCarouselDatas } = useContext(CommonContext);

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
  // console.log(history.length)
  // const RepresentativeItems = SelectItem()
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
              <Grid item md={10} xs={12}>
                <ControlledCarousel />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
                className="tiemPopularity"
                position="absolute"
              >
                <Box
                  height="80%"
                  // border={1}
                  // borderColor="secondary.main"
                >
                  <h2>실시간</h2>
                  {carouselDatas.map((TmpData, index) => (
                    <h6>
                      {index + 1}. {TmpData.event_item['1'].prod_name}
                    </h6>
                  ))}
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
      </Layout>
    </ViewContext.Provider>
  );
};

export default MainVote;
