import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    arr:[]
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addUser:(state,action)=>{
       state.users=action.payload

    },
    removeUser:(state,action)=>{

        state.users=[]
    }
  },
});

export const { addUser,removeUser } = bookSlice.actions;
export default bookSlice.reducer;
