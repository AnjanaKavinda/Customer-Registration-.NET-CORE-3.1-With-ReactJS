import { ActionTypes } from "../contants/action-types";

const initialGetState ={
    details: [],
};
const initialPostState ={
    details: [],
    Response: [],
    error: [],
};
const initialupdateState ={
    details: [],
    Response: [],
    error: [],
};
const initialDeleteState ={
    details: [],
    Response: [],
    error: [],
};
const customerReducer = (state = initialGetState, action) =>{
    switch (action.type) {
        case ActionTypes.GET_customer:
            return {
             details: action.payload,
            }
        default:
            return state;
    }
};

const customerPostReducer = (state = initialPostState, action) =>{
    switch (action.type) {
        case ActionTypes.SET_customer:
            return {
             details: action.payload,
             error: action.error,
             Response: action.Response,
            }
        default:
            return state;
    }
};

const customerUpdateReducer = (state = initialupdateState, action) =>{
    switch (action.type) {
        case ActionTypes.EDIT_customer:
            return {
             details: action.payload,
             error: action.error,
             Response: action.Response,
            }
        default:
            return state;
    }
};

const customerDeleteReducer = (state = initialDeleteState, action) =>{
    switch (action.type) {
        case ActionTypes.REMOVE_customer:
            return {
             details: action.payload,
             error: action.error,
             Response: action.Response,
            }
        default:
            return state;
    }
};

export {customerReducer, customerPostReducer, customerUpdateReducer, customerDeleteReducer}