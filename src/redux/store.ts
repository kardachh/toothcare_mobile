import {createSlice, Slice} from "@reduxjs/toolkit";
import {User, Client, Service} from "../types";

const mainSlice: Slice = createSlice({
    name: 'mainSlice',
    initialState: {
        // auth: <boolean>false,
        // user: <User|null>null,
        auth: <boolean>true,
        // user: <User|null>{id: "trqAAkfc7b9stJlHxyKI", type: "employee"},
        user: <User|null>{id: "admin", type: "admin"},
        selectedDate: <any>new Date(),
        clients: <Client[]>[],
        services: <Service[]>[],
        delServices: <string[]>[],
        filteredServices: <Service[]>[],
        users: <User[]>[],
        orderNeedUpdate: <boolean>true
    },
    reducers: {
        setAuth(state, action) {
            state.auth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setSelectedDate(state, action) {
            state.selectedDate = new Date(action.payload)
        },
        setClients(state, action) {
            state.clients = action.payload
        },
        setServices(state, action) {
            state.services = action.payload
        },
        setDelServices(state, action) {
            state.delServices = action.payload
        },
        setFilteredServices(state, action) {
            state.filteredServices = action.payload
        },
        setUsers(state, action) {
            state.users = action.payload
        },
        setOrderNeedUpdate(state, action) {
            state.orderNeedUpdate = action.payload
        },
    }
});

export default mainSlice.reducer

export const {
    setAuth,
    setUser,
    setSelectedDate,
    setClients,
    setServices,
    setDelServices,
    setFilteredServices,
    setUsers,
    setOrderNeedUpdate
} = mainSlice.actions
