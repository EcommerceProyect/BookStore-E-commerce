import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    loading:true,
    error:"",
    allOrders:[]

}

export const usersOrdersSlice = createSlice({
    name:"usersOrders",
    initialState,
    reducers: {

        UserAdminOrderStart(state){
            state.loading = true;
            state.error = null;
        },
        setUserAdminOrders(state,action) {
            state.allOrders = action.payload;
            state.loading = false;
        },
        getUserAdminOrdersError(state,action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetUserAdminOrders(state){
            state.allOrders = [];
            state.loading = false;
        }

    }


})

export const {
    setUserAdminOrders,
    UserAdminOrderStart,
    getUserAdminOrdersError,
    resetUserAdminOrders
} = usersOrdersSlice.actions;

export default usersOrdersSlice.reducer;