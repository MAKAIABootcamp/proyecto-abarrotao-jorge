import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:"0",
        imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantsImg%2Frest1.PNG?alt=media&token=8d0baf0b-4788-4511-89b4-c7941ccac823",
        descripcion:"Pardes Restaurant",
        descripcionFull: "We transmit HAPPINESS to your palate, through essences and flavors from the bowels of Colombia.",
        numStars:"4",
        workTime:"Work time 09:30 - 23:00",
        beforeyou:"4$",
        shippingTime:"15-20 min"
    }
]

export const restaurantSlice = createSlice({
      name: 'restaurants',
      initialState,
      reducers: {
        addRestaurant: (state, action) => {
            state.push(action.payload);
        },
        editRestaurant: (state, action) =>{
           const {id,descripcion, descripcionFull, numStars, workTime, beforeyou, shippingTime } = action.payload;
           const foundRestaurant = state.find(restaurant => restaurant.id === id);

           if(foundRestaurant){
            // foundRestaurant.id = 
            foundRestaurant.descripcion = descripcion
            foundRestaurant.descripcionFull = descripcionFull
            foundRestaurant.numStars = numStars
            foundRestaurant.workTime = workTime
            foundRestaurant.beforeyou = beforeyou
            foundRestaurant.shippingTime = shippingTime
           }
        },
        deleteRestaurant: (state, action) => {
            const restaurantFound = state.find(restaurant =>restaurant.id === action.payload);
            if(restaurantFound){
                state.splice(state.indexOf(restaurantFound),1);
            }
        },
        
      }
});

export const {addRestaurant, deleteRestaurant, editRestaurant} = restaurantSlice.actions;
export default restaurantSlice.reducer;