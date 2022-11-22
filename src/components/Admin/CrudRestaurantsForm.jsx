import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRestaurant,
  editRestaurant,
} from "../../features/restaurants/restaurantSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

function CrudRestaurantsForm() {
  const [restaurant, setRestaurant] = useState({
    imagen: "",
    descripcion: "",
    descripcionFull: "",
    numStars: "",
    workTime: "",
    beforeyou: "",
    shippingTime: "",
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
      <form onSubmit={handleSubmit}>
        <input
          name="imagen"
          type="text"
          placeholder="URL imagen"
          onChange={handleChange}
          value={restaurant.imagen}
        />
        <input
          name="descripcion"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={restaurant.descripcion}
        />
        <input
          name="descripcionFull"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          value={restaurant.descripcionFull}
        />
        <input
          name="numStars"
          type="text"
          placeholder="Rating"
          onChange={handleChange}
          value={restaurant.numStars}
        />
        <input
          name="workTime"
          type="text"
          placeholder="Work time"
          onChange={handleChange}
          value={restaurant.workTime}
        />
        <input
          name="beforeyou"
          type="text"
          placeholder="Before you"
          onChange={handleChange}
          value={restaurant.beforeyou}
        />
        <input
          name="shippingTime"
          type="text"
          placeholder="Shipping time"
          onChange={handleChange}
          value={restaurant.shippingTime}
        />
        <button>Save</button>
      </form>
    );
  };


export default CrudRestaurantsForm;