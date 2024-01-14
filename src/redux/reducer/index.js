import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import recommendationSlice from "../slices/recommendationSlice";

const rootReducer = combineReducers({
    auth:authSlice,
    aiRecommendations:recommendationSlice,
})

export default rootReducer;