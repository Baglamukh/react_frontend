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
    items : []
}


const roomSlice = createSlice({
    name: "roomSlice",
    initialState,
    reducers: {
       
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setItems: (state, action) => {
            state.items = action.payload;
          
        },
    }
})

export const { setStatus, setItems } = roomSlice.actions

export default roomSlice.reducer



 


