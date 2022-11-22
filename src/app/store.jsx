import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from '../features/restaurants/restaurantSlice';
import dishReducer from '../features/dishes/dishSlice';
import restaurantUserReducer from '../features/restaurants/restaurantUserSlice';
import dishUserReducer from '../features/dishes/dishUserSlice';
import orderUserReducer from '../features/orders/orderUserSlice';

export const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
        dishes: dishReducer,
        restaurantsUser: restaurantUserReducer,
        dishesUser: dishUserReducer,
        orders: orderUserReducer,
    },
});

export default store;