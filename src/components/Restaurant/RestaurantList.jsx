import React, { useState } from 'react';
import { Container, Stack, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './restaurantlist.css';
import { FcRating, FcShop, FcLike } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRestaurantUser } from '../../features/restaurants/restaurantUserSlice';
import { AiOutlineHome, AiOutlineSearch, AiOutlineRedo, AiOutlineUser } from "react-icons/ai";


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
                {/* <Navbar bg="light" expand="lg" fixed="bottom">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/"><AiOutlineHome /></Nav.Link>
                            <Nav.Link href="/search"><AiOutlineSearch /></Nav.Link>
                            <Nav.Link href="/order"><AiOutlineRedo /></Nav.Link>
                            <Nav.Link href="/userprofile"><AiOutlineUser /></Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>  */}
                    {restaurantArray.map((restaurantObject, index) => {
                        return (
                            <>
                                <Row key={index} onClick={handleClick(restaurantObject)}  >
                                    <Col>
                                        <img src={restaurantObject.imagen} className="img_restaurant" alt="restaurant"/>
                                    </Col>
                                    <Col className="col_text">
                                        <p className='desc_text'>{restaurantObject.description}</p>
                                        <p className='rating_text'> {restaurantObject.numStars}</p>
                                        <p className='work_time_text'>{restaurantObject.workTime}</p>
                                        
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