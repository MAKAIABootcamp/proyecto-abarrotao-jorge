import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deleteRestaurant} from '../../features/restaurants/restaurantSlice';
import {Link} from 'react-router-dom';


function CrudRestaurantsList() {
    const restaurants = useSelector(state => state.restaurants);
    const dispatch = useDispatch();

     const handleDelete = (id) => {
        dispatch(deleteRestaurant(id));
        console.log(id);
     }
    
  return (
    <div>
        <header>
            <h1>Restaurants {restaurants.length}</h1>
            <Link to='/create-restaurant'>Create restaurant</Link>
        </header>
        {restaurants.map(restaurant =>(
           <div key={restaurant.id}>
            <p>{restaurant.descripcion}</p>
            <p>{restaurant.descripcionFull}</p>
            <p>{restaurant.numStars}</p>
            <p>{restaurant.workTime}</p>
            <p>{restaurant.beforeyou}</p>
            <p>{restaurant.shippingTime}</p>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
            <Link to={`/edit-restaurant/${restaurant.id}`}>Edit</Link>
           </div>
        ))}
    </div>
  )
}

export default CrudRestaurantsList;