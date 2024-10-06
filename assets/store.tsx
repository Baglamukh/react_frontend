import { configureStore  }  from "@reduxjs/toolkit";


// persist
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";



// slice
import  prodReducer  from  "./productSlice"; 
import  userReducer  from  "./userSlice"; 
import billReducer from  './billSlice';
import userInfoReducer from  './userInfoSlice';
import floorReducer from  './floorReducer'
import mapReducer from  './mapReducer'
import roomReducer from  './roomReducer'


const persistConfig = {
    key: 'root',
    version:1,
    storage: AsyncStorage,
  }


const reducers = combineReducers({
    prod : prodReducer,
    user: userReducer,
    bill: billReducer,
    userInfo :  userInfoReducer,
    floorCurr :  floorReducer,
    map:  mapReducer,
    room: roomReducer , 
  });
  
 
const persistedReducer = persistReducer(persistConfig, reducers);


 const store = configureStore({
    reducer: persistedReducer,
    devTools: 'dev' !== "production"

  });
  
export  default store






