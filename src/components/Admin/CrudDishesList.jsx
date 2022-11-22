import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deleteDish} from '../../features/dishes/dishSlice';
import {Link} from 'react-router-dom';


function CrudDishesList() {
    const dishes = useSelector(state => state.dishes);
    const dispatch = useDispatch();

     const handleDelete = (id) => {
        dispatch(deleteDish(id));
        console.log(id);
     }
    
  return (
    <div>
        <header>
            <h1>Dishes {dishes.length}</h1>
            <Link to='/create-dish'>Create dish</Link>
        </header>
        {dishes.map(dish =>(
           <div key={dish.id}>
            <p>{dish.descripcion}</p>
            <p>{dish.imagen}</p>
            <p>{dish.name}</p>
            <p>{dish.price}</p>
            <button onClick={() => handleDelete(dish.id)}>Delete</button>
            <Link to={`/edit-dish/${dish.id}`}>Edit</Link>
           </div>
        ))}
    </div>
  )
}

export default CrudDishesList;