import React, { useContext } from 'react'
import { Grid, Divider } from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';

const CouponModal = (modalNum) => {

    const { itemDialogOpen, setItemDialogOpen } = useContext(CommonContext);

    return (
        <>
            <Grid style={{ display: "flex" }}>
                <Grid>
                    이곳은 이미지가 들어갈 곳입니다.
                </Grid>
                <Grid>
                    <Grid>
                        쿠폰이 발행되었습니다!
                    </Grid>

                    <Divider />
                    <Grid>
                        상품은 상품입니다.
                    </Grid>

                    <Divider />
                    <Grid>
                        <button onClick={() => modalNum.setModalNum(3)}>
                            퀴즈 풀고 추가 할인 받기
                        </button>
                        <button onClick={() => setItemDialogOpen(false)}>
                            창 닫기
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default CouponModal;