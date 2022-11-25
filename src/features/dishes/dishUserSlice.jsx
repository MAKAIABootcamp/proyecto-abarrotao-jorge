import { createSlice } from "@reduxjs/toolkit";


export const dishUserSlice = createSlice({
      name: 'dishesUser',
      initialState : [],
      reducers: {
        addDishesUser: (state, action) => {
            state.push(action.payload);
        },
        deleteDishesUser: (state, action) => {
          const dishFound = state.find(dish => dish.id === action.payload);

          if(dishFound){
            state.splice(state.indexOf(dishFound), 1);
          }
        }
      }
});

export const {addDishesUser, deleteDishesUser} = dishUserSlice.actions;
export default dishUserSlice.reducer;