import { createSlice } from "@reduxjs/toolkit";


export const restaurantUserSlice = createSlice({
      name: 'restaurants',
      initialState : [],
      reducers: {
        addRestaurantUser: (state, action) => {
            state.push(action.payload);
        },
        deleteRestaurantsUser: (state, action) => {
          const restaurantFound = state.find(restaurant => restaurant.id === action.payload);

          if(restaurantFound){
            state.splice(state.indexOf(restaurantFound), 1);
          }
        },
        deleteAllRestaurantsUser: (state, action) => {
            state.splice(action.payload);
        }
      }
});

export const {addRestaurantUser, deleteRestaurantsUser, deleteAllRestaurantsUser} = restaurantUserSlice.actions;
export default restaurantUserSlice.reducer;