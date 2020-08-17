import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import BarChartIcon from '@material-ui/icons/BarChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PieChartIcon from '@material-ui/icons/PieChart';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Wrapper from './styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const NestedList = props => {
  // *** 사이드 바 내에서 open 기능
  const [currentOpen, setCurrentOpen] = useState(props.index);
  const [forceRender, setForceRender] = useState({});
  const history = useHistory();

  const handleClick = index => {
    console.log(index);
    setCurrentOpen(index);
    setForceRender({});
    if (index === 0) {
      history.push('/admin');
    } else if (index === 1) {
      history.push('/admin/user');
    } else if (index === 2) {
      history.push('/admin/product');
    } else if (index === 3) {
      history.push('/admin/vs');
    } else {
      history.push('/admin/quiz');
    }
  };

  const currentStyle = {
    backgroundColor: '#3023d5',
    color: 'white',
    'font-weight': '500',
    borderRight: '3px solid white',
  };

  const classes = useStyles();

  return (
    <Wrapper>
      <List component="nav" className="sidebar__main">
        <Grid
          className="sidebar__logo_box"
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <img
            className="sidebar__logo"
            src="https://i3b309.p.ssafy.io/images/폰트_화이트.png"
            alt="logo"
            style={{ width: '100%' }}
          />
        </Grid>
        <Divider variant="middle" style={{ margin: '10px 20px 10px' }} />
        <ListItem
          button
          className="sidebar__item"
          onClick={index => handleClick(0)}
          style={currentOpen === 0 ? currentStyle : null}
        >
          <EqualizerIcon className="sidebar__icon" />
          <p className="sidebar__p">판매 현황</p>
        </ListItem>
        <ListItem
          button
          className="sidebar__item"
          onClick={index => handleClick(1)}
          style={currentOpen === 1 ? currentStyle : null}
        >
          <PersonIcon className="sidebar__icon" />
          <p className="sidebar__p">사용자 관리</p>
        </ListItem>
        <ListItem
          button
          className="sidebar__item"
          onClick={index => handleClick(2)}
          style={currentOpen === 2 ? currentStyle : null}
        >
          <InboxIcon className="sidebar__icon" />
          <p className="sidebar__p">상품 관리</p>
        </ListItem>

        <ListItem
          button
          className="sidebar__item"
          onClick={() => handleClick(3)}
          style={currentOpen === 3 ? currentStyle : null}
        >
          <EventIcon className="sidebar__icon" />
          <p className="sidebar__p">이벤트 관리</p>
        </ListItem>

        <ListItem
          button
          className="sidebar__item"
          onClick={() => handleClick(4)}
          style={currentOpen === 4 ? currentStyle : null}
        >
          <DraftsIcon className="sidebar__icon" />
          <p className="sidebar__p">퀴즈 관리</p>
        </ListItem>
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="center"
          className="sidebar__admin_grid"
        >
          <Divider
            variant="middle"
            style={{
              width: '80%',
              margin: '15px 0',
            }}
          />
          <div className={classes.root}>
            <Avatar
              alt="Remy Sharp"
              src={`https://i3b309.p.ssafy.io/images/KakaoTalk_20200807_174132070.jpg`}
              className={classes.large}
            />
          </div>
          <div className="sidebar__admin_title">Admin</div>
          <div className="sidebar__admin_desc">싸피마트 (대전, 봉명동)</div>
          {/* <div className="sidebar__admin_item">Main Page</div> */}
          <button className="sidebar__logout_button">
            &nbsp;&nbsp;로그아웃
            <ArrowForwardRoundedIcon
              fontSize="small"
              style={{ marginLeft: '5px' }}
            />
          </button>
        </Grid>
      </List>
    </Wrapper>
  );
};

export default NestedList;
