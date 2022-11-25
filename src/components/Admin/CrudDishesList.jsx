import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deleteDish} from '../../features/dishes/dishSlice';
import {Link} from 'react-router-dom';
import {Badge, Button, Row, Col } from 'react-bootstrap';


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
            <h3>List of Dishes </h3>
            <p>Amount: <b>{dishes.length}</b></p>
            <div style={{ display:"flex", justifyContent:"flex-end"}}>
              <Badge bg="warning" text="dark" style={{padding:"1%", marginBottom:"2%"}}>
                <Link to='/create-dish' style={{fontSize:"20px"}}>Create dish</Link>
              </Badge>
            </div>
        </header>
        {dishes.map(dish =>(
          <>
          <Row key={dish.id} >
              <Col>
                  <img src={dish.imagen} style={{borderRadius:"10%", width:"70%", height:"70%"}} alt="dish"/>
                  <p style={{alignItems:"center"}}><b>{dish.name}</b></p>
              </Col>
              <Col className="col_text">
                <p><b>Description:</b></p>
                <p><i>{dish.descripcion}</i></p>
              </Col>
              <Col>
                <p><b>Price: </b> <i>{dish.price}</i></p>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => handleDelete(dish.id)}>Delete</Button>{'   '}
                <Link to={`/edit-dish/${dish.id}`}>Edit</Link>
              </Col>
          </Row>
          <hr />
      </>
        ))}
    </div>
  )
}

export default CrudDishesList;