import { createSlice } from "@reduxjs/toolkit";


export const orderUserSlice = createSlice({
      name: 'orders',
      initialState : [],
      reducers: {
        addOrders: (state, action) => {
            state.push(action.payload);
        },
        deleteOrders: (state, action) => {
          const orderFound = state.find(order => order.id === action.payload);

          if(orderFound){
            state.splice(state.indexOf(orderFound), 1);
          }
        }
      }
});

export const {addOrders, deleteOrders} = orderUserSlice.actions;
export default orderUserSlice.reducer;