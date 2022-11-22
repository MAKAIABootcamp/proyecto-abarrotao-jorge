import React from "react";
import CrudRestaurantsForm from "./CrudRestaurantsForm";
import CrudRestaurantsList from "./CrudRestaurantsList";

function CrudRestaurants() {
  return (
    <div className="App">
        <CrudRestaurantsForm />
        <CrudRestaurantsList />  
    </div>
  );
}

export default CrudRestaurants;