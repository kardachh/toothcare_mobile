import {createSlice, Slice} from "@reduxjs/toolkit";
import {User, Client, Service} from "../types";

const mainSlice:Slice = createSlice({
    name:'mainSlice',
    initialState: {
        auth: <boolean>true,
        user: <User|null>{id:"admin"},
        // auth: <boolean>false,
        // user: <User|null>null,
        selectedDate: <any>new Date(),
        clients: <Client[]>[],
        services: <Service[]>[]
    },
    reducers: {
        setAuth(state, action){
            state.auth = action.payload
        },
        setUser(state,action){
            state.user = action.payload
        },
        setSelectedDate(state,action){
            state.selectedDate = new Date(action.payload)
        },
        setClients(state,action){
            state.clients = action.payload
        },
        setServices(state,action){
            state.services = action.payload
        }
    }
});

export default mainSlice.reducer

export const {
    setAuth,
    setUser,
    setSelectedDate,
    setClients,
    setServices
} = mainSlice.actions
