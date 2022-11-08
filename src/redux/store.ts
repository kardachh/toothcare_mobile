import {createSlice} from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name:'mainSlice',
    initialState: {
        auth: false
    },
    reducers: {
        setAuth(state, action){
            state.auth = action.payload
        }
    }
});

export default mainSlice.reducer

export const {
    setAuth
} = mainSlice.actions
