// react
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Axios from 'axios';

// ui
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// hook
import { CommonContext } from './context/CommonContext';
import { useLocalStorageSetState } from './common/CommonHooks';

// page
import Auth from './pages/Auth/';
import Terms from './pages/Terms/';
import MyVote from './pages/MyVote/';
import AboutMe from './pages/AboutMe/';
import NotFound from './pages/NotFound/';
import MainVote from './pages/MainVote/';
import ContactUs from './pages/ContactUs/';
import CreateVote from './pages/CreateVote/';
import SearchVote from './pages/SearchVote/';
import KioskMains from './pages/Kiosk/KioskMain';
import KioskQuiz from './pages/Kiosk/KioskQuiz';
import KioskCoupons from './pages/Kiosk/KioskCoupons';
import MyCoupon from './pages/MyCoupon/';
import VoteItemDetail from './pages/VoteItemDetail';
import SearchResult from './pages/SearchResult';
import EventAll from './pages/EventAll';

// VoteGridList에서 쓰고있던 상품들 입니다.
// import ProductData from './components/Grid/VoteGridList/dump.json';
import CarouselData from './pages/Kiosk/KioskMain/dump.json';
import CategoryData from './pages/MainVote/dump.json';

import MyCouponData from './pages/Kiosk/KioskMain/dump.json';

// css
// import './index.css';

// const
const defaultThumbnailImage = 'default_user.jpg';
const HOST = '192.168.0.82:3001';
const serverUrl = `http://${HOST}/v1`;
const serverUrlBase = `http://${HOST}`;
const serverImgUrl = `https://ssafy-viba-s3.s3.ap-northeast-2.amazonaws.com/public/`;

/// theme
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Noto Sans KR'].join(','),
    button: {
      fontFamily: 'Noto Sans KR',
    },
    body1: {
      fontWeight: 500,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

// app
const App = () => {
  const [user, setUser] = useLocalStorageSetState(
    {
      user_no: 0,
      user_id: '',
      user_nm: '',
      user_pwd: '',
      user_img_url: '',
      status: '',
      web_site: '',
      token: '',
    },
    'user',
  );
  const [infoData, setInfoData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userDialogIndex, setUserDialogIndex] = useState(0);
  const [isShowKeyborad, setIsShowKeyborad] = useState(false);
  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDetailDialogOpen] = useState(false);
  const [userDialogOpen, setUserDetailDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);

  // 웹상에서 퀴즈모달을 띄우기 위해 선언했습니다.
  const [webQuizDialogOpen, setWebQuizDialogOpen] = useState(false);

  // 이 상품들을 commonContext에 넣어줬습니다.
  // 다른페이지에서 상품을 빼서 쓰고싶으면 이 이름으로 선언을 해줘야 합니다(ex. VoteGridList 참고)
  const [productDatas, setProductDatas] = useState([]);

  const [carouselDatas, setCarouselDatas] = useState(CarouselData);
  const [categoryDatas, setCategoryDatas] = useState(CategoryData);

  const [MyCouponDatas, setMyCouponDatas] = useState(MyCouponData);

  // 이벤트중인 아이템들을 모달창에 띄우기 위해 선언했습니다.
  const [eventNum, setEventNum] = useState();

  // CouponModal 페이지에 선택된 아이템을 전달해 주기 위해 선언했습니다.
  const [selectedEventItem, setSelectedEventItem] = useState();

  // App.js 실행시 최초 1회만 받아옴 => useEffect 사용
  const choichohanbun = () => {
    console.log('안들어옴?');
    Axios.get('https://i3b309.p.ssafy.io/api/product').then(function(res) {
      console.log('App.js res:', res.data);
      setProductDatas(res.data);
    });
  };

  // useEffect(실행될 함수, 의존값이 들어있는 배열(deps)),
  // deps를 비우게 될 경우 컴포넌트가 처음 나타날때만 useEffect에 등록한 함수가 호출된다.
  // 참고 자료 : https://react.vlpt.us/basic/16-useEffect.html

  // 현재 작동 안하고 있습니다. 다른 시도를 해봐야 될듯 합니다.
  useEffect(() => {
    choichohanbun();
  }, []);

  return (
    <CommonContext.Provider
      value={{
        serverUrl,
        user,
        setUser,
        drawerOpen,
        setDrawerOpen,
        signDialogOpen,
        setSignDialogOpen,
        infoDialogOpen,
        setInfoDetailDialogOpen,
        infoData,
        setInfoData,
        userDialogOpen,
        setUserDetailDialogOpen,
        userDialogIndex,
        setUserDialogIndex,
        webQuizDialogOpen,
        setWebQuizDialogOpen,
        // 아이템 디테일페이지에서 모달창을 다루기 위해 추가했습니다.
        itemDialogOpen,
        setItemDialogOpen,

        serverUrlBase,
        serverImgUrl,
        isShowKeyborad,
        setIsShowKeyborad,
        defaultThumbnailImage,

        /* 이부분이 commonContext에 넣어주는 부분입니다. */
        productDatas,
        setProductDatas,
        carouselDatas,
        setCarouselDatas,
        categoryDatas,
        setCategoryDatas,
        MyCouponDatas,
        setMyCouponDatas,
        eventNum,
        setEventNum,
        selectedEventItem,
        setSelectedEventItem,
      }}
    >
      {console.log('This is App.js carouselDatas', carouselDatas)}
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainVote} />
            <Route exact path="/MainVote" component={MainVote} />
            <Route exact path="/Auth" component={Auth} />
            <Route exact path="/Terms" component={Terms} />
            <Route exact path="/MyVote" component={MyVote} />
            <Route exact path="/AboutMe" component={AboutMe} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/SearchVote" component={SearchVote} />
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/CreateVote" component={CreateVote} />
            <Route exact path="/KioskMains" component={KioskMains} />
            <Route exact path="/KioskCoupons" component={KioskCoupons} />
            <Route exact path="/KioskQuiz" component={KioskQuiz} />
            <Route exact path="/MyCoupon" component={MyCoupon} />
            <Route exact path="/EventAll" component={EventAll} />
            <Route path="/VoteItemDetail/:id" component={VoteItemDetail} />
            <Route path="/SearchResult/:searchValue" component={SearchResult} />

            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </CommonContext.Provider>
  );
};

export default App;
