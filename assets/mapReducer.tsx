import { createSlice } from "@reduxjs/toolkit"

import axios from "axios";
import url from "./url";

const initialState = {
    status: "success",
    width: 0,
    length: 0,
    floor: 1,
    floorsData: []
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setWidth: (state, action) => {
            state.width = action.payload
        },
        setLength: (state, action) => {
            state.length = action.payload
        },
        setFloor: (state, action) => {
            state.floor = action.payload
        },
        setFloorsData: (state, action) => {
            state.floorsData = action.payload
        },
    }
})

export const { setStatus, setWidth ,setLength ,setFloor , setFloorsData , } = mapSlice.actions

export default mapSlice.reducer

export const settingFloorData = (id)=>{

    return async (dispatch ,  getState) =>{
        //console.log(id)
           // console.log(getState().floorCurr)
        try {
            
            let data = getState().floorCurr.data

            let floors  =   getState().map.floorsData
            
            let newData  =  [...floors].map((el ,  ind)=>{

                if(el.id  ==  data.id){

                    return data
                }else{
                    return el
                }
            })
            
            console.log(newData)

            dispatch(setFloorsData(newData))

        } catch (error) {
            console.log(error.message)
        }


    }
}