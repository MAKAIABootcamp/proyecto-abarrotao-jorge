import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:"1",
        imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fbolognese.jpg?alt=media&token=757c22ba-1e5c-4c2c-b8ce-ac94f19ea495",
        descripcion:"Onion and vegetables",
        name: "Bolognese Salad",
        price:"14.45",
        
    },
    {
        id:"2",
        imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Ffruitsalad.jpg?alt=media&token=822b1174-2543-4706-a3ba-d1c93cf7aecc",
        descripcion:"Tomatoes, chicken, sauce!",
        name: "Caesar salad without sauce",
        price:"17.45",
        
    },
    {
        id:"3",
        imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr2_1.jpg?alt=media&token=ddda1ccd-c5d5-4a8b-97f5-fec6f19fb528",
        descripcion:"Slow simmered, sweet onios, toped with savory",
        name: "French Onion Soup",
        price:"13.28",
        
    },
    {
        id:"4",
        imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr2_2.jpg?alt=media&token=1258b59a-3ceb-4d8f-b3df-f6b54eae52fd",
        descripcion:"Elegancy marbled japanese",
        name: "Soy Marinated",
        price:"17.05",
        
    },
    {
        id:"5",
        imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantDishes%2Fr3_4.jpg?alt=media&token=345f65b1-ff46-45f2-859b-45cf1c227e7e",
        descripcion:"Beef filet marinated in soy sauce",
        name: "Beef filet",
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