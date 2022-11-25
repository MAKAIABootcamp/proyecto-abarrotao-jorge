import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id:"0", imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantsImg%2Fr2_1.jpg?alt=media&token=c3760893-f7e6-433f-b6d3-edd9238d3746", 
        descripcion:"Pardes Restaurant", descripcionFull:"We transmit HAPPINESS to your palate, through essences and flavors from the bowels of Colombia. Try our delicious special pizza.",
        numStars:"4", workTime:"09:30 - 23:00", beforeyou:"4$", shippingTime:"15-20 min"},
    {id:"1", imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantsImg%2Fr2_2.jpg?alt=media&token=21037284-d72a-439a-88b2-1e15acb91f37", 
        descripcion:"Glamour Kafe", descripcionFull:"We have the best coffee in the region. Take it how you want, espresso, cappuccino. We also have delicious and sweet frappes.",
        numStars:"3", workTime:"09:00 - 21:00", beforeyou:"13$", shippingTime:"15-20 min"},
    {id:"2", imagen:"https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/restaurantsImg%2Fr2_3.jpg?alt=media&token=7a429d56-3a67-4cf4-bffa-c62e6d406782", 
        descripcion:"Aromat Bakery", descripcionFull:"We are an artisan bakery where we offer you delicious and soft breads, sweet and salty.",
        numStars:"5", workTime:"09:00 - 22:00", beforeyou:"3$", shippingTime:"15-20 min"}
]

export const restaurantSlice = createSlice({
      name: 'restaurants',
      initialState,
      reducers: {
        addRestaurant: (state, action) => {
            state.push(action.payload);
        },
        editRestaurant: (state, action) =>{
           const {id, descripcion, descripcionFull, numStars, workTime, beforeyou, shippingTime, imagen } = action.payload;
           const foundRestaurant = state.find(restaurant => restaurant.id === id);

           if(foundRestaurant){
            foundRestaurant.descripcion = descripcion
            foundRestaurant.descripcionFull = descripcionFull
            foundRestaurant.numStars = numStars
            foundRestaurant.workTime = workTime
            foundRestaurant.beforeyou = beforeyou
            foundRestaurant.shippingTime = shippingTime
            foundRestaurant.imagen = imagen
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