import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deleteRestaurant} from '../../features/restaurants/restaurantSlice';
import {Link} from 'react-router-dom';
import { useAuth } from '../../context/firebaseContext';
import {Badge, Button, Row, Col } from 'react-bootstrap';


function CrudRestaurantsList() {
    const restaurants = useSelector(state => state.restaurants);
    const dispatch = useDispatch();
    const {user, logout, loading} = useAuth();

     const handleDelete = async (id) => {
        //const restaurantsFetch = await deleteRestaurantFire(id);
        dispatch(deleteRestaurant(id));
     }
    
  return (
    <div>
        <header>
            <h3>List of Restaurants </h3>
            <p>Amount: <b>{restaurants.length}</b></p>
            <div style={{ display:"flex", justifyContent:"flex-end"}}>
              <Badge bg="warning" text="dark" style={{padding:"1%", marginBottom:"2%"}}>
                <Link to='/create-restaurant' style={{fontSize:"20px"}}>Create restaurant</Link>
              </Badge>
            </div>
        </header>
        {restaurants.map(restaurant =>(
          <>
          <Row key={restaurant.id} >
              <Col>
                  <img src={restaurant.imagen} style={{borderRadius:"10%", width:"70%", height:"70%"}} alt="restaurant"/>
                  <p style={{alignItems:"center"}}><b>{restaurant.descripcion}</b></p>
              </Col>
              <Col className="col_text">
                <p><b>Description:</b></p>
                <p><i>{restaurant.descripcionFull}</i></p>
              </Col>
              <Col>
              <p><b>Number of stars: </b> <i>{restaurant.numStars}</i></p>
                <p><b>Work time: </b> <i>{restaurant.workTime}</i></p>
                <p><b>Before you </b> $ <i>{restaurant.beforeyou}</i></p>
                <p><b>Shipping time: </b> <i>{restaurant.shippingTime}</i></p>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => handleDelete(restaurant.id)}>Delete</Button>{'   '}
                <Link to={`/edit-restaurant/${restaurant.id}`}>Edit</Link>
              </Col>
          </Row>
          <hr />
      </>
        ))}
    </div>
  )
}

export default CrudRestaurantsList;