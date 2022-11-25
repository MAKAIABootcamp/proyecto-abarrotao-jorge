import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRestaurant,
  editRestaurant,
} from "../../features/restaurants/restaurantSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button} from "react-bootstrap";
import './crudadminform.css';


function CrudRestaurantsForm() {
  const [restaurant, setRestaurant] = useState({
    imagen: "",
    descripcion: "",
    numStars: "",
    workTime: "",
    beforeyou: "",
    shippingTime: "",
    descripcionFull: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const restaurants = useSelector((state) => state.restaurants);

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editRestaurant(restaurant));
    } else {
      dispatch(
        addRestaurant({
          ...restaurant,
          id: uuid(),
        })
      );
    }
        navigate("/crudrestaurants");
    };


    useEffect(() => {
      if (params.id) {
        setRestaurant(
          restaurants.find((restaurant) => restaurant.id === params.id)
        );
      }
    }, []);

    return (
      <Container className='crudform_container'>

      <h3> Welcome!</h3>
      <p>Here, you can add or edit the information of your restaurants for your app! </p>

      <Form onSubmit={handleSubmit} className="form_container">

        <h4>Create or edit your restaurant</h4>
        <p>Please enter your information below: </p>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>URL image *</Form.Label>
          <Form.Control required name="imagen" type="text" placeholder="URL image" 
              onChange={handleChange} value={restaurant.imagen} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name *</Form.Label>
          <Form.Control required name="descripcion" type="text" placeholder="Name" 
              onChange={handleChange} value={restaurant.descripcion} />
        </Form.Group>
          
        <div className="little_field">
          <Form.Group className="mb-3" controlId="formBasicStars" >
            <Form.Label >Rating *</Form.Label>
            <Form.Control required name="numStars" type="text" placeholder="Number of stars" 
                onChange={handleChange}   className="little_field" value={restaurant.numStars}/>
          </Form.Group>
        </div>

        <div className="little_field">
          <Form.Group className="mb-3" controlId="formBasicWorkTime" >
            <Form.Label>Work time *</Form.Label>
            <Form.Control required name="workTime" type="text" placeholder="Work time" 
                onChange={handleChange}   className="little_field" value={restaurant.workTime}/>
          </Form.Group>
        </div>

        <div className="little_field">
          <Form.Group className="mb-3" controlId="formBasicBeforeYou">
            <Form.Label>Before you *</Form.Label>
            <Form.Control required name="beforeyou" type="text" placeholder="Before you" 
                onChange={handleChange}  className="little_field" value={restaurant.beforeyou}/>
          </Form.Group>
        </div>

        <div className="little_field">
          <Form.Group className="mb-3" controlId="formBasicShippingTime">
            <Form.Label>Shipping Time *</Form.Label>
            <Form.Control required name="shippingTime" type="text" placeholder="Shipping time" 
                onChange={handleChange} className="little_field" value={restaurant.shippingTime}/>
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="formBasicFullDescription">
          <Form.Label>Description *</Form.Label>
          <Form.Control required name="descripcionFull" type="text" placeholder="Description" 
              onChange={handleChange}   as="textarea" rows={3} value={restaurant.descripcionFull}/>
        </Form.Group>

        <div style={{ display:"flex", justifyContent:"flex-end"}}>
          <Button variant="warning" type="submit" style={{ width: "51%", float:"right", marginTop: "2%"}}>Save</Button>
        </div>

      </Form>
      </Container>
    );
  };


export default CrudRestaurantsForm;