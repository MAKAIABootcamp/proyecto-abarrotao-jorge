import React, { useState } from 'react';
import { Container, Stack, Row, Col } from 'react-bootstrap';
import './restaurantlist.css';
import { FcRating } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRestaurantUser } from '../../features/restaurants/restaurantUserSlice';


export const RestaurantList = ({ arrayRestaurant: restaurantArray }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleClick = (restaurant) => () => {
        dispatch(addRestaurantUser(restaurant));
        navigate("/dishes");
     };

    return (
        <>
            <Container fluid className='container'>
                <Stack>
                    {restaurantArray.map((restaurantObject, index) => {
                        return (
                            <>
                                <Row key={index} onClick={handleClick(restaurantObject)}  >
                                    <Col>
                                        <img src={restaurantObject.imagen} className="img_restaurant" alt="restaurant"/>
                                    </Col>
                                    <Col className="col_text">
                                        <p className='desc_text'>{restaurantObject.description}</p>
                                        <p className='rating_text'><FcRating /> {restaurantObject.numStars}</p>
                                        <p className='work_time_text'>{restaurantObject.workTime}</p>
                                        <p>Before you <b>{restaurantObject.beforeyou}</b></p>
                                    </Col>
                                </Row>
                                <hr />
                            </>
                        )
                    })}
                </Stack>
            </Container>
            </>
    )
};
export default RestaurantList;