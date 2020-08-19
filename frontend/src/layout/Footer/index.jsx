import React, { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { Grid } from '@material-ui/core';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';

const Footer = () => {
  const { drawerOpen } = useContext(CommonContext);
  const history = useHistory();
  return (
    <Wrapper>
      <Grid container className="footer">
        <Grid item sm={12} md={8} className="left-box">
          <ul className="page">
            <li>
              <span
                onClick={() => {
                  history.push('/Terms');
                  window.scrollTo(0, 0);
                }}
              >
                개인정보처리방침
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  history.push('/AboutMe');
                  window.scrollTo(0, 0);
                }}
              >
                개발자 소개
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  history.push('/ContactUs');
                  window.scrollTo(0, 0);
                }}
              >
                문의
              </span>
            </li>
          </ul>
          <ul className="info">
            <li>Gola la Gola | CEO : 김재경</li>
            <li>대전 광역시 유성구 학하서로 121번길 45-18 (덕명동)</li>
            <li>Tel 042-2222-5566 | Fax 042-2233-6655</li>
          </ul>
          <p>Copyright by Gola la Gola Co., Ltd. All rights reserved.</p>
        </Grid>
        <Grid item sm={12} md={4} className="right-box">
          <Grid className="text-box">
            <h2>문의 연락</h2>
            <h5>help@golalagolasurrpot.com</h5>
            <h4>고객 지원 팀에 문의 바랍니다.</h4>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Footer;
