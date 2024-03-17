// store.js
import { configureStore } from '@reduxjs/toolkit';
import { ProductsSlice } from './slices/products';
import { AuthSlice } from './slices/auth';
import { BasketsSlice } from './slices/basket';
import { OrdersSlice } from './slices/order';

const store = configureStore({
    reducer:{
        products: ProductsSlice.reducer,
        auth: AuthSlice.reducer,
        basket:BasketsSlice.reducer,
        order:OrdersSlice.reducer
    }
}
);
export default store;