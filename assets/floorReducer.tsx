import { createSlice } from "@reduxjs/toolkit"

import axios from "axios";
import url from "./url";

import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const initialState = {   
    status: "success",
    data : {}
}


const floorInfoSlice = createSlice({
    name: "floorInfo",
    initialState,
    reducers: {
       
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setData: (state, action) => {
            state.data = action.payload;
          
        },
    }
})

export const { setStatus, setData } = floorInfoSlice.actions

export default floorInfoSlice.reducer

export const settingFloor =  (val) =>{
    return  async (dispatch ,  getState)=>{
        try {
            let data = getState();
            // console.log(data)
            dispatch( setStatus('loading'))

            dispatch( setData(val))
            dispatch( setStatus('success'))
            
        } catch (error) {
            console.log(error.message)
             dispatch( setStatus('error'))
        }
    }
} 

 


