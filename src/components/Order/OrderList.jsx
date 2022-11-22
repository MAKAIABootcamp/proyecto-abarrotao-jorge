import React, { useState } from 'react';
import {  Container, Stack, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './orderlist.css';


export const OrderList = () => {
    const createdOrder = useSelector(state => state.orders);
    console.log('createdOrder');
    console.log(createdOrder);

    return (
            <Container>
                <Stack>
                {createdOrder.map((order, index) => {
                        return (
                            <>
                                <Row key={index} >
                                    <Col xs={2}>
                                        <img src={order.imagen} alt="order" style={{borderRadius:"10%"}}/>
                                    </Col>
                                    <Col>
                                        <p className='desc_text'>{order.quantity}</p>
                                    </Col>
                                    <Col>
                                        <p className='desc_text'>{order.name}</p>
                                    </Col>
                                    <Col>
                                        <p className='work_time_text'>{order.price}</p>
                                    </Col>
                                </Row>
                                <hr />
                            </>
                        )
                    })}
                </Stack>
            </Container>
    )
};
export default OrderList;