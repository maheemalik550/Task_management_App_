import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth:false,
    loading:true,
    profile:null,
    members:null

}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        authAction:(state, actions)=> {
          state.auth = actions.payload.auth
          state.profile = actions.payload.profile
          state.loading = false
    
        },
        Selected_members:(state,actions)=>{
            state.members = actions.payload
        }
    }

})

export const {authAction,Selected_members} = authSlice.actions
export default authSlice.reducer