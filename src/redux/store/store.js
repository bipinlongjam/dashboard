import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from '../slice/widgetSlice'
import modalReducer from '../slice/modalSlice'


const store = configureStore({
    reducer:{
            widgets: widgetReducer,
            modal: modalReducer,
    },
})

export default store;
