import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDish,
  editDish,
} from "../../features/dishes/dishSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button} from "react-bootstrap";
import './crudadminform.css';


function CrudDishesForm() {
  const [dish, setDish] = useState({
    imagen: "",
    descripcion: "",
    name: "",
    price: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const dishes = useSelector((state) => state.dishes);

  const handleChange = (e) => {
    setDish({
      ...dish,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editDish(dish));
    } else {
      dispatch(
        addDish({
          ...dish,
          id: uuid(),
        })
      );
    }
        navigate("/cruddishes");
    };


    useEffect(() => {
      if (params.id) {
        setDish(
          dishes.find((dish) => dish.id === params.id)
        );
      }
    }, []);

    return (
      <Container className='crudform_container'>

        <h3> Welcome!</h3>
        <p>Here, you can add or edit the information of your dishes for your app! </p>

        <Form onSubmit={handleSubmit} className="form_container">

          <h4>Create or edit your dish</h4>
          <p>Please enter your information below: </p>

          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>URL image *</Form.Label>
            <Form.Control required name="imagen" type="text" placeholder="URL image" 
                onChange={handleChange} value={dish.imagen} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name *</Form.Label>
            <Form.Control required name="name" type="text" placeholder="Name" 
                onChange={handleChange} value={dish.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescripcion">
            <Form.Label>Description *</Form.Label>
            <Form.Control required name="descripcion" type="text" placeholder="Description" 
                onChange={handleChange} value={dish.descripcion} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price *</Form.Label>
            <Form.Control required name="price" type="text" placeholder="Price" 
                onChange={handleChange} value={dish.price} />
          </Form.Group>

          <div style={{ display:"flex", justifyContent:"flex-end"}}>
            <Button variant="warning" type="submit" style={{ width: "51%", float:"right", marginTop: "2%"}}>Save</Button>
          </div>
          
        </Form>
      </Container>

      // <form onSubmit={handleSubmit}>
      
      // <input
      //     name="imagen"
      //     type="text"
      //     placeholder="URL imagen"
      //     onChange={handleChange}
      //     value={dish.imagen}
      //   /> 
       
      //   <input
      //     name="descripcion"
      //     type="text"
      //     placeholder="descripcion"
      //     onChange={handleChange}
      //     value={dish.descripcion}
      //   /> 
      //   <input
      //     name="name"
      //     type="text"
      //     placeholder="name"
      //     onChange={handleChange}
      //     value={dish.name}
      //   />

      //   <input
      //     name="price"
      //     type="text"
      //     placeholder="price"
      //     onChange={handleChange}
      //     value={dish.price}
      //   />
        
      //   <button>Save</button>
      // </form>
    );
  };

export default CrudDishesForm;