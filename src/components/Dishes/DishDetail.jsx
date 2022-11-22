import React, { useState, useEffect } from 'react';
import { Button, Container, Stack, InputGroup } from 'react-bootstrap';
import { BsPlus} from "react-icons/bs";
import { BiMinus, BiArrowBack } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { deleteDishesUser } from '../../features/dishes/dishUserSlice';
import { useNavigate } from 'react-router-dom';
import { addOrders } from '../../features/orders/orderUserSlice';
import './dishdetail.css';

export const DishDetail = () => {

    let [ count, setCount ] = useState(0);
    const selectedDish = useSelector(state => state.dishesUser);
    let [ unitPrice, setUnitPrice ] = useState(0);
    let [ totalPrice, setTotalPrice ] = useState(0);
    const dispatch = useDispatch();
    const [ error, setError ] = useState();
    const navigate = useNavigate();

    function mapearDish(){
        selectedDish.map(dish => (
            totalPrice = dish.price,
            unitPrice = dish.price
        ));
    }

    const incrementCount = (e) => {
        e.preventDefault();
        count = count + 1;
        setCount(count);

        if(count > 0){
            totalPrice = unitPrice * count;
            let unitP = unitPrice;
            setTotalPrice(totalPrice);
            setUnitPrice(unitP);
        }
    }

    const decrementCount = (e) => {
        e.preventDefault();
        count = count - 1;
        setCount(count);
        if(count <= 0 ){
            count = 0;
            setCount(count);
            totalPrice = 0;
            setTotalPrice(totalPrice);
        }else{
            totalPrice = unitPrice * count;
            let unitP = unitPrice;
            setTotalPrice(totalPrice);
            setUnitPrice(unitP);
        }
    }

    const handleBack = (idDish, dish) => {
        setError('');
        console.log(dish);
        try{
            if(count > 0){
                dispatch(addOrders(dish));
            }
            dispatch(deleteDishesUser(idDish));
         } catch (error) {
             setError(error.message);
         }
         navigate("/dishes");
    }

    useEffect(() => {
        //Retornar el listado de platos
        try{
            mapearDish();
        }catch(error){
            console.error(error);
        }
    }, [ ])


    return(
        <Container className='dishdetail_container'>
            <Stack>
                {/* Datos del plato */}
                <div className="restaurant_container">
                    {selectedDish.map(dish => (
                        <>
                        <Button variant="light" onClick={() => handleBack(dish.id, dish)}><BiArrowBack/></Button> 
                       
                            <div key={dish.id} className="container_restaurant">
                                <img src={dish.imagen} alt="dish" className='div_img_container'/>
                                <h2 className="desc_text">{dish.name}</h2>
                                <p className="work_time_text">{dish.description}</p>
                            </div>
                        
                    <div className="container_restaurant_2">
                    <div className="container_restaurant">
                        <Button variant="light" onClick={decrementCount}><BiMinus /></Button>
                        <InputGroup.Text name="iCount" > {count} </InputGroup.Text>
                        <Button variant="light" onClick={incrementCount}><BsPlus /></Button>
                    </div>
                    <div className="separador">

                    </div>
                    <div className="container_restaurant">
                        <Button variant="warning">Add</Button>
                        <Button variant="warning">{totalPrice.toFixed(2)}</Button>
                    </div>
                </div>
                </>
                    ))}
                </div>
            </Stack>
        </Container>
    )
};
export default DishDetail;