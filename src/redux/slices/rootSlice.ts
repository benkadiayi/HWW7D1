import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'classic car',
        price: "2000.00",
        description: "Redefine what's possible",
        max_speed: '140 kph',
        dimensions: '255 x 312 x 127mm',
        weight: 'Approx 795g',
        cost_of_product: 450.00,
        series: 'DJI FPV Series'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        choosePrice: (state, action) => { state.price = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, choosePrice, } = rootSlice.actions;