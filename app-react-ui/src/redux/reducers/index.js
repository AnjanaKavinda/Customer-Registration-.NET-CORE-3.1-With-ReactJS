import { combineReducers } from "redux";

import { customerReducer, customerPostReducer, customerUpdateReducer, customerDeleteReducer } from "./customerReducer";


const reducers = combineReducers({
    allcustomers: customerReducer,
    postcustommer: customerPostReducer,
    updatetcustommer: customerUpdateReducer,
    deletecustommer: customerDeleteReducer,
})

export default reducers;