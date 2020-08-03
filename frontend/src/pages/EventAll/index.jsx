import React, { useContext } from 'react';
import { Grid } from '@material-ui/core'
import { CommonContext } from '../../context/CommonContext';
import Layout from '../../layout'

const EventAll = () => {

    const { carouselDatas, setCarouselDatas } = useContext(CommonContext);

    const testFunc = () => {

    }

    return (
        <Layout>
            <Grid>
                {carouselDatas.map((TmpData, index) => (
                    <Grid container>
                        <Grid className="KisokCentering">
                            <img
                                className="tmp"
                                src={TmpData.event_item["1"].prod_image}
                                alt="image1"
                                style={{ width: "150px", height: "150px" }}
                            />
                            <input type="checkbox"
                                name={`eventNum${index}`}
                                value={TmpData.event_item["1"].prod_id}
                                onChange={testFunc(TmpData.event_item["1"].prod_id)}
                            />
                        </Grid>
                        <Grid className="KisokCentering">
                            <img
                                className="tmp"
                                src={TmpData.event_item["2"].prod_image}
                                alt="image2"
                                style={{ width: "150px", height: "150px" }}
                            />
                            <input
                                type="checkbox"
                                name={`eventNum${index}`}
                                value={TmpData.event_item["2"].prod_id}
                                onChange={testFunc(TmpData.event_item["2"].prod_id)}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Layout >
    );

}

export default EventAll;
