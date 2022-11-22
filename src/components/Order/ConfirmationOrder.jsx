
import './confirmationorder.css';
import {  Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ConfirmationOrder = () => {
    const navigate = useNavigate();

    const handleConfirmerOrder = () => {
        navigate("/");
    }

    return (
        <div className="container_restaurant">
                <img src={"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/Others%2FconfirmedOrder.PNG?alt=media&token=719c134b-4513-4243-9f5a-4d4fff99d5af"} alt="confirmed">
                </img>
                <h5>Order is accepted</h5>

                <Button variant="warning" onClick={handleConfirmerOrder} >Thanks!</Button>
            
        </div>
    )
}