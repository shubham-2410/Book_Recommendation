import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recommendations : [] ,
    myBooks:[]
};

const recommendationSlice = createSlice({
    name: "aiRecommendations",
    initialState,
    reducers: {
        setRecommendations: (state, value) => {
            state.recommendations = value.payload;
        },
        setMyBooks: (state, value) => {
            state.myBooks = value.payload;
        }
    },
});

export const { setRecommendations , setMyBooks } = recommendationSlice.actions;
export default recommendationSlice.reducer;
