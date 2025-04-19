import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:null,
    isAuthenticated:false
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload; 
            state.isAuthenticated = true
        },
        logOut:(state,action)=>{
            state.user = null;
            state.isAuthenticated = false
        }
    }
});
export const { login} = userSlice.actions

export default userSlice.reducer

