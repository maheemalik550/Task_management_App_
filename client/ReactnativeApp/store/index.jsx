import {combineReducers, configureStore } from "@reduxjs/toolkit";
import user_slice from "./slice/user_slice";

const reducers = combineReducers({
    auth:user_slice
})


export const store = configureStore({
   reducer:reducers
})