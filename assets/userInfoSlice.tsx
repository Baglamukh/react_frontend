

import { createSlice } from "@reduxjs/toolkit"


import axios from "axios";
import url from "./url";

import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const initialState = {

   
    sUIStatus: "success",
    uName :"",
    uDOB: "" ,
    uAddress:"",
    uMobile:"",
    uEmail :""
   
    
}


const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
       
        setSUIStatus: (state, action) => {
            state.sUIStatus = action.payload
        },
        setUName: (state, action) => {
            state.uName = action.payload
        },
        setUDOB: (state, action) => {
            state.uDOB = action.payload
        },
        setUAddress: (state, action) => {
            state.uAddress = action.payload
        },
        setUMobile: (state, action) => {
            state.uMobile = action.payload
        },
        setUEmail: (state, action) => {
            state.uEmail = action.payload
        },
     
    }
})

export const { setSUIStatus, setUName, setUDOB, setUAddress, setUMobile ,  setUEmail } = userInfoSlice.actions

export default userInfoSlice.reducer

//  api calls || network req
// export const searchUser = (val) => {
//     return async (dispatch, getState) => {
//         try {
//             let data = getState();
//             dispatch(setSUStatus('loading'))
//             const res = await axios.post(`${url}/user-search`, { ...data.user.billUser });
//             if (res.data.matchingUsers) 
//                 dispatch(setSearchUsers(res.data.matchingUsers));
//             } else {
//                 dispatch(setSearchUsers([]));
//             }
//             dispatch(setSUStatus('success'))
//         } catch (error) {
//             dispatch(setSUStatus('error'))
//             console.log(error.message);
//         }
//     }
// }






