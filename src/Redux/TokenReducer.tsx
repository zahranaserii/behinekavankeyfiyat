import { createSlice } from "@reduxjs/toolkit";


interface IinitialState{
    token:string|undefined;
}
const initialState:IinitialState={
    token:undefined
}
const TokenReducer=createSlice({
    name: "TokenReducer",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            const token=action.payload
            localStorage.setItem('token',token)
            state.token=token
        }
    }
})


export const {setToken}=TokenReducer.actions
export default TokenReducer.reducer