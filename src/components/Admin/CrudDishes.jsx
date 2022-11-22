import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDish,
  editDish,
} from "../../features/dishes/dishSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <input
          name="imagen"
          type="text"
          placeholder="URL imagen"
          onChange={handleChange}
          value={dish.imagen}
        />
        <input
          name="descripcion"
          type="text"
          placeholder="descripcion"
          onChange={handleChange}
          value={dish.descripcion}
        />
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
          value={dish.name}
        />
        <input
          name="price"
          type="text"
          placeholder="price"
          onChange={handleChange}
          value={dish.price}
        />
        
        <button>Save</button>
      </form>
    );
  };

export default CrudDishesForm;