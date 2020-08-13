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
import CreateEvent from './pages/CreateEvent/';
import SearchVote from './pages/SearchVote/';
import KioskMains from './pages/Kiosk/KioskMain';
import KioskQuiz from './pages/Kiosk/KioskQuiz';
import KioskCoupons from './pages/Kiosk/KioskCoupons';
import MyCoupon from './pages/MyCoupon/';
import VoteItemDetail from './pages/VoteItemDetail';
import SearchResult from './pages/SearchResult';
import EventAll from './pages/EventAll';
import Admin from './pages/Admin/index';
import AdminVS from './pages/Admin/VS/index';
import AdminQuiz from './pages/Admin/Quiz/';
import AdminQuizForm from './pages/Admin/Quiz/Form';
import AdminUser from './pages/Admin/User/';
import AdminProduct from './pages/Admin/Product/';
import AdminProductForm from './pages/Admin/Product/Form';

//
import CategoryData from './pages/MainVote/dump.json';

// VoteGridList에서 쓰고있던 상품들 입니다.

// css
import './index.css';

// const
const defaultThumbnailImage = 'default_user.jpg';
const HOST = '192.168.0.82:3001';
const serverUrl = `http://${HOST}/v1`;
const serverUrlBase = `http://${HOST}`;
const serverImgUrl = `https://i3b309.p.ssafy.io/images`;

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
      user_id: 0,
      user_email: '',
      user_name: '',
      user_phone: '',
      user_pwd: '',
      user_image: '',
      user_quiz: '',
      isAdmin: '',
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
  const [productDatas, setProductDatas] = useState([]); // 전체 데이터
  const [sortedDatas, setSortedDatas] = useState([]);
  // const [categoryDatas, setCategoryDatas] = useState([]); // 카테고리 데이터
  const [categoryDatas, setCategoryDatas] = useState(CategoryData); // 카테고리 데이터

  // 이벤트중인 아이템들을 모달창에 띄우기 위해 선언했습니다.
  const [eventNum, setEventNum] = useState(null);

  // CouponModal 페이지에 선택된 아이템을 전달해 주기 위해 선언했습니다.
  const [selectedEventItem, setSelectedEventItem] = useState();
  // 메인 주소로 사용할 URL 입니다.
  // 배포되면 바꿔야합니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 아주 아주 아주 중요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [mainUrl, setMainUrl] = useState('http://localhost:3000');

  // 관리지 페이지 중 vs이벤트 CRUD를 위해 선언했습니다.
  const [currentEventDatas, setCurrentEventDatas] = useState([]);

  // 관리지 페이지 중 Quiz CRUD를 위해 선언했습니다.
  const [currentQuizDatas, setCurrentQuizDatas] = useState({});

  // 관리지 페이지 중 Product CRUD를 위해 선언했습니다.
  const [currentProductDatas, setCurrentProductDatas] = useState({});

  // 퀴즈 데이터
  const [quizDatas, setQuizDatas] = useState([]);

  // MyCoupon, EventAll 페이지에서 유저가 참여한 이벤트에서 유저가 고른 쿠폰의 데이터를 모아놓은 배열입니다.
  const [myCouponDatas, setMyCouponDatas] = useState([]); // 쿠폰 데이터 객체
  const [userCoupon, setUserCoupon] = useState([]); // 쿠폰 데이터 리스트
  const [userEvent, setUserEvent] = useState([]); // 쿠폰 데이터 리스트

  // 제품 수량 && 판매 현황 개수
  const [buyDatas, setBuyDatas] = useState([]);
  const [vsData, setVSData] = useState([]);

  //
  const [newEventData, setNewEventData] = useState({
    event_id: '',
    event_prod_A: '',
    event_prod_B: '',
    event_date: '',
    event_expire: '',
    event_category: '',
  });

  // admin product 페이지에서 사용하는 변수 입니다.
  const [productsTableData, setProductsTableData] = useState({
    columns: [
      { title: '상품', field: 'prod_name' },
      { title: '가격', field: 'prod_price' },
      { title: '수량', field: 'prod_amount' },
      { title: '유통기한', field: 'prod_expiration' },
      { title: '할인율', field: 'prod_sale', type: 'numeric' },
    ],
    data: [],
  });

  // admin product 페이지에서 사용하는 변수 입니다.
  const [quizzesTableData, setQuizzesTableData] = useState({
    columns: [
      { title: '퀴즈', field: 'quiz_question' },
      { title: '정답', field: 'quiz_answer' },
      { title: '힌트', field: 'quiz_hint' },
      { title: '참여자 수', field: 'quiz_num' },
    ],
    data: [],
  });

  // admin product 페이지에서 사용하는 변수 입니다.
  const [usersTableData, setUsersTableData] = useState({
    columns: [
      { title: 'ID', field: 'user_email' },
      { title: '이름', field: 'user_name' },
      { title: '전화 번호', field: 'user_phone' },
      { title: '퀴즈 참여 여부', field: 'user_quiz' },
    ],
    data: [],
  });

  // App.js 실행시 최초 1회만 받아옴 => useEffect 사용
  // 전체 데이터
  async function getProductDatas() {
    await Axios.get('https://i3b309.p.ssafy.io/api/product').then(function(
      res,
    ) {
      setProductDatas(res.data);
      setSortedDatas(res.data);
      productsTableData.data = res.data;
      setProductsTableData(productsTableData);
      getEventDatas();
    });
  }
  // 이벤트(VS) 데이터
  // 사용되는 곳: Web (캐로젤, 이벤트 페이지), 관리자 (이벤트 CRUD 페이지),Kiosk (캐로젤, 전체 보여주기)
  async function getEventDatas() {
    await Axios.get('https://i3b309.p.ssafy.io/api/event').then(function(res) {
      setCurrentEventDatas(res.data);
      getMyCouponDatas();
    });
  }
  // 카테고리 데이터
  // const getCategoryDatas = () => {
  //   Axios.get('https://i3b309.p.ssafy.io/api/category').then(function(res) {
  //     setCategoryDatas(res.data);
  //   });
  // };

  // 쿠폰 데이터
  async function getMyCouponDatas() {
    if (user.user_id) {
      await Axios.get(
        `https://i3b309.p.ssafy.io/api/coupon/${user.user_id}`,
      ).then(function(res) {
        // myCouponDatas 만들기
        setMyCouponDatas(res.data);

        // userCoupom, userEvent 만들기
        const tmpCoupon = [];
        const tmpEvent = [];
        res.data.forEach(element => {
          tmpCoupon.push(element.coupon_select);
          tmpEvent.push(element.event_id);
        });
        setUserCoupon(tmpCoupon);
        setUserEvent(tmpEvent);
      });
    }
    getUserDatas();
  }

  // 유저 데이터
  async function getUserDatas() {
    await Axios.get('https://i3b309.p.ssafy.io/api/auth/').then(function(res) {
      usersTableData.data = res.data;
      setUsersTableData(usersTableData);
    });
    getQuizDatas();
  }

  // 퀴즈 데이터
  async function getQuizDatas() {
    await Axios.get('https://i3b309.p.ssafy.io/api/quiz').then(function(res) {
      quizzesTableData.data = res.data;
      setQuizzesTableData(quizzesTableData);
      setQuizDatas(res.data);
    });
  }

  // 제품 수량 && 판매 현황 개수
  async function getBuyDatas() {
    Axios.get('http://localhost:5000/api/product/buy/').then(function(res) {
      setBuyDatas(res.data);
    });
  }
  async function getEventProducts() {
    Axios.get('https://i3b309.p.ssafy.io/api/coupon/estimation').then(function(
      res,
    ) {
      setVSData(res.data);
    });
  }

  useEffect(() => {
    getProductDatas();
    getBuyDatas();
    getEventProducts();
    // getEventDatas();
    // getCategoryDatas();
    // getMyCouponDatas();
  }, []);

  // useEffect(() => {
  //   getEventDatas();
  // }, []);

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
        sortedDatas,
        setSortedDatas,
        categoryDatas,
        setCategoryDatas,
        selectedEventItem,
        setSelectedEventItem,
        mainUrl,
        setMainUrl,

        // 관리자 페이지에서 Event, Quiz, Product CRUD에 사용하는 부분입니다.
        currentEventDatas,
        setCurrentEventDatas,
        currentQuizDatas,
        setCurrentQuizDatas,
        currentProductDatas,
        setCurrentProductDatas,
        productsTableData,
        setProductsTableData,
        quizzesTableData,
        setQuizzesTableData,
        usersTableData,
        setUsersTableData,

        // EventAll 페이지와 myCoupon페이지에서 사용합니다.
        myCouponDatas,
        setMyCouponDatas,
        userCoupon,
        setUserCoupon,
        userEvent,
        setUserEvent,

        newEventData,
        setNewEventData,
        eventNum,
        setEventNum,

        // admin/quiz에서 수정을 위해 사용되는 데이터 입니다.
        quizDatas,
        setQuizDatas,

        // 제품 수량 && 판매 현황 개수
        buyDatas,
        setBuyDatas,
        vsData,
        setVSData,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainVote} />
            <Route exact path="/mainvote" component={MainVote} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/myvote" component={MyVote} />
            <Route exact path="/aboutme" component={AboutMe} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/searchvote" component={SearchVote} />
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/createevent" component={CreateEvent} />
            <Route exact path="/kioskmains" component={KioskMains} />
            <Route exact path="/kioskcoupons" component={KioskCoupons} />
            <Route exact path="/kioskquiz" component={KioskQuiz} />
            <Route exact path="/mycoupon" component={MyCoupon} />
            <Route exact path="/eventall" component={EventAll} />
            <Route
              exact
              path="/voteitemdetail/:name/:id"
              component={VoteItemDetail}
            />
            <Route
              exact
              path="/searchresult/:searchValue"
              component={SearchResult}
            />

            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/vs" component={AdminVS} />
            <Route exact path="/admin/quiz" component={AdminQuiz} />
            <Route exact path="/admin/quiz/form" component={AdminQuizForm} />

            <Route exact path="/admin/user" component={AdminUser} />
            <Route exact path="/admin/product" component={AdminProduct} />
            <Route
              exact
              path="/admin/product/form"
              component={AdminProductForm}
            />
            <Route exact path="/admin/createevent" component={CreateEvent} />

            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </CommonContext.Provider>
  );
};

export default App;
