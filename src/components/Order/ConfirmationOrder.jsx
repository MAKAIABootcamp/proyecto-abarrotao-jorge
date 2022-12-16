
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
                <img src={"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/ConfirmImg%2FTurno%20agendado%20(1).png?alt=media&token=e79640be-53e9-46f0-a378-148201b77d53"} alt="confirmed">
                </img>
                <h5>Su turno ha sido agendado con éxito. Recuerde llegar a tiempo según la hora seleccionada.</h5>

                <Button variant="success" onClick={handleConfirmerOrder} >Regresar al inicio</Button>
            
        </div>
    )
}