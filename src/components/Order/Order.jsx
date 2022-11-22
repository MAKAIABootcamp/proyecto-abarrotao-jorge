import React, { useState } from 'react';
import {  Container, Stack, Nav, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { SiMastercard } from "react-icons/si";
import { GrLocation, GrPaypal } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import { deleteOrders } from '../../features/orders/orderUserSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { OrderList } from './OrderList';


export const Order = () => {
    const [ error, setError ] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleBack = (idOrder, order) => {
        setError('');
        window.alert("¿Está seguro que desea salir? Si sale, se cancelará su orden");
        try{  
            dispatch(deleteOrders(idOrder));
         } catch (error) {
             setError(error.message);
         }
         navigate("/dishes");
    }

    const handleConfirmerOrder = () => {
        navigate("/confirmationorder");
    }

    return (
        <Container fluid className='login_container'>
        <Stack>
            <h3>Deliver to</h3>
            <DropdownButton id="dropdown-item-button" title="82 Well St, New-York" 
                style={{ marginBottom:"2%"}}
                variant="light">
                    <Dropdown.Item><GrLocation /> 12 - 82 8th Street</Dropdown.Item>
                    <Dropdown.Item as="button"><GrLocation /> 46 - 23 8th Street </Dropdown.Item>
            </DropdownButton>

            <h3 style={{ marginTop:"1%"}}> Payment </h3>

            <Nav variant="pills" defaultActiveKey="/">
            <Nav.Item > </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/" >Cash</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey="link-1"><SiMastercard /> 2344...4348</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey="link-2"><GrPaypal /> Paypal</Nav.Link>
                </Nav.Item>
            </Nav>

            <div style={{ display:"flex", justifyContent:"flex-end"}}>
                <Button variant="warning" onClick={handleConfirmerOrder} >Order</Button>
            </div>

            <OrderList />  
        </Stack>
        </Container>
    )
}