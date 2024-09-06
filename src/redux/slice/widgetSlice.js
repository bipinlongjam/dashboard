import { createSlice } from "@reduxjs/toolkit";
import widgetData from '../../Data/WidgetData.json'

const widgetSlice = createSlice({
    name:'widgets',
    initialState:{
        widgets:[],
        categories:widgetData.categories,
    },
    reducers:{
        addWidgets: (state, action) => {
            const { widgets, category } = action.payload;
            const newWidgets = widgets.map(widget => ({...widget, category}))
            state.widgets.push(...newWidgets);
            localStorage.setItem('widgets', JSON.stringify(state.widgets))
          },
        removeWidgets:(state, action) =>{
            state.widgets.splice(action.payload, 1);
            localStorage.setItem('widgets', JSON.stringify(state.widgets));
        },
        loadWidgets:(state) =>{
            const storedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
            state.widgets = storedWidgets;
        },
        saveWidgets:(state) =>{
            localStorage.setItem('widgets', JSON.stringify(state.widgets))
        }
    }
})

export const {addWidgets, removeWidgets, loadWidgets, saveWidgets} = widgetSlice.actions;
export default widgetSlice.reducer;