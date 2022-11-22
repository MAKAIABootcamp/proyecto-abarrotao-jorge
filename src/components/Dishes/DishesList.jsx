import React from 'react';
import { Container, Stack, Row, Col } from 'react-bootstrap';
import './disheslist.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addDishesUser } from '../../features/dishes/dishUserSlice';


export const DishesList = ({ arrayDish: dishArray }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (dish) => () => {
        dispatch(addDishesUser(dish));
        navigate("/dishdetail");
     };

    return (
            <Container fluid className='disheslist_container'>
                <Stack>
                    {dishArray.map((dishObject, index) => {
                        return (
                            <>
                                <Row key={index} onClick={handleClick(dishObject)} >
                                    <Col >
                                        <img src={dishObject.imagen} alt="dish" style={{borderRadius:"8%"}} />
                                    </Col>
                                    <Col >
                                        <p className='desc_text'>{dishObject.name}</p>
                                        <p>${dishObject.price}</p>
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
export default DishesList;