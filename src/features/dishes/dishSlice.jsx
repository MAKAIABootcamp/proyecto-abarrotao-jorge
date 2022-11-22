import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:"1",
        imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fbolognese.jpg?alt=media&token=757c22ba-1e5c-4c2c-b8ce-ac94f19ea495",
        descripcion:"Onion and vegetables",
        name: "Bolognese Salad",
        price:"14.45",
        
    }
]

export const dishSlice = createSlice({
      name: 'dishes',
      initialState,
      reducers: {
        addDish: (state, action) => {
            state.push(action.payload);
        },
        editDish: (state, action) =>{
           const {id, imagen, descripcion, name, price } = action.payload;
           const foundDish = state.find(dish => dish.id === id);

           if(foundDish){
            // foundRestaurant.id = 
            foundDish.imagen = imagen
            foundDish.descripcion = descripcion
            foundDish.name = name
            foundDish.price = price
            
           }
        },
        deleteDish: (state, action) => {
            const dishFound = state.find(dish =>dish.id === action.payload);
            if(dishFound){
                state.splice(state.indexOf(dishFound),1);
            }
        },
        
      }
});

export const {addDish, deleteDish, editDish} = dishSlice.actions;
export default dishSlice.reducer;