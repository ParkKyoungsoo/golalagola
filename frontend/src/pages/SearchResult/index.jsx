import React, { useContext } from 'react';

import { GridList, Grid, useMediaQuery, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useNowCols } from '../../common/MediaQueryHooks';
import Wrapper from './styles';
import Layout from '../../layout/';
import { CommonContext } from '../../context/CommonContext';
import VoteGridItem from '../../components/Grid/VoteGridItem';

const Result = ({ match }) => {
  const { productDatas } = useContext(CommonContext);
  const nowCols = useNowCols();
  const items = [];
  const isMobile = useMediaQuery('(max-width:960px)');
  return (
    <Wrapper className="root">
      <Layout>
        {productDatas.map((itemData, index) => {
          if (itemData.prod_name.includes(match.params.searchValue)) {
            // console.log('TmpData', itemData);
            items.push(itemData);
          }
        })}
        <Grid className="Centering">
          {items.length === 0 ? (
            <Grid
              item
              md={9}
              style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Alert severity="error">
                <h2>검색 결과를 찾지 못하였습니다.</h2>
                <p>
                  '{match.params.searchValue}' 검색어로 0개의 카테고리 내 총
                  0개의 상품이 검색되었습니다.
                </p>
                <Divider />
                <Grid
                  style={{
                    color: '#838383',
                    textAlign: 'left',
                  }}
                >
                  <br />
                  <h2>찾으시는 상품이 없으신가요?</h2>
                  <p>
                    찾으시는 제품이 사이트 내에서 검색 되지 않는다면 고객센터로
                    연락주세요.
                  </p>
                  <p>
                    편안하고 즐거운 쇼핑을 위해 원하시는 상품을 찾아드립니다.
                  </p>
                  <div>
                    <h3 style={{ float: 'left' }}>고객센터&nbsp;</h3>
                    <h3 style={{ color: '#2570CB' }}>9463 - 9454</h3>
                    <p>월~금 : 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)</p>
                    <p>토, 일, 공휴일 휴무</p>
                  </div>
                  <h5>SEARCH TIPS</h5>
                  <ol>
                    <li>검색어가 올바르게 입력되었는지 확인해주세요.</li>
                    <li>검색어의 띄어쓰기를 다르게 해보세요.</li>
                    <li>
                      한글을 영어로 혹은 영어를 한글로 입력했는지 확인해보세요.
                    </li>
                    <li>
                      상품이 품절되었을 경우 검색이 되지 않을 수 있습니다.
                    </li>
                  </ol>
                </Grid>
              </Alert>
            </Grid>
          ) : (
            <Grid
              item
              style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Grid
                style={{
                  padding: '5vh',
                }}
              >
                <h4>'{match.params.searchValue}' 의 검색 결과입니다.</h4>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item md={9} style={{ margin: 'auto' }}>
          <Divider />
        </Grid>
        <Grid className="Centering">
          <Grid item md={9}>
            <GridList
              className="grid-list"
              cols={Number.isInteger(nowCols) ? nowCols : 1}
              cellHeight={'auto'}
            >
              {/* {console.log('length', items.length)} */}

              {items.map((itemData, index) => {
                if (isMobile) {
                  return (
                    <Grid
                      key={index}
                      style={isMobile ? { padding: '5vh 5vw' } : null}
                      item
                      xs={6}
                      style={{
                        padding: ' 5vw',
                      }}
                    >
                      <VoteGridItem itemData={itemData} index={index} />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      key={index}
                      style={isMobile ? { padding: '5vh 5vw' } : null}
                      item
                      xs={3}
                    >
                      <VoteGridItem itemData={itemData} index={index} />
                    </Grid>
                  );
                }
              })}
            </GridList>
          </Grid>
        </Grid>
      </Layout>
    </Wrapper>
  );
};

export default Result;
