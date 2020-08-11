import React, { useHistory, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Wrapper from './styles';
import Divider from '@material-ui/core/Divider';

const NestedList = props => {
  // *** 사이드 바 내에서 open 기능
  const [currentOpen, setCurrentOpen] = useState(props.index);
  const [forceRender, setForceRender] = useState({});
  const handleClick = index => {
    console.log(index);
    setCurrentOpen(index);
    setForceRender({});
  };

  const currentStyle = {
    backgroundColor: '#3023d5',
    color: 'white',
    'font-weight': '500',
  };

  // ***

  return (
    <Wrapper>
      <List component="nav" className="sidebar__main">
        <h3 className="sidebar__logo">로고자리</h3>
        <Divider variant="middle" className="sidebar__divider" />
        <ListItem
          button
          className="sidebar__item"
          onClick={index => handleClick(1)}
          style={currentOpen === 1 ? currentStyle : null}
        >
          <SendIcon className="sidebar__icon" />
          <p className="sidebar__p">Users</p>
        </ListItem>
        <ListItem
          button
          className="sidebar__item"
          onClick={index => handleClick(2)}
          style={currentOpen === 2 ? currentStyle : null}
        >
          <InboxIcon className="sidebar__icon" />
          <p className="sidebar__p">Products</p>
        </ListItem>

        <ListItem
          button
          className="sidebar__item"
          onClick={() => handleClick(3)}
          style={currentOpen === 3 ? currentStyle : null}
        >
          <DraftsIcon className="sidebar__icon" />
          <p className="sidebar__p">Events</p>
        </ListItem>

        <ListItem
          button
          className="sidebar__item"
          onClick={() => handleClick(4)}
          style={currentOpen === 4 ? currentStyle : null}
        >
          <DraftsIcon className="sidebar__icon" />
          <p className="sidebar__p">Quizzes</p>
        </ListItem>
      </List>
    </Wrapper>
  );
};

export default NestedList;
