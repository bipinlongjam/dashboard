import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        isOpen:false,
        selectedCategory:'',
    },
    reducers:{
        openModal:(state) =>{
            state.isOpen = true;
        },
        closeModal:(state) =>{
            state.isOpen = false;
            state.selectedCategory = ''
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
          },
    }
})

export const {openModal, closeModal, setSelectedCategory} = modalSlice.actions;
export default modalSlice.reducer;