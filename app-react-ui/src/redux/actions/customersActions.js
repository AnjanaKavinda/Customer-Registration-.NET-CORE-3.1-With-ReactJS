import { ActionTypes } from "../contants/action-types";
import { Getcustomers, Postcustomer, Putcustomers, deletecustomers } from "../../api/axiosRequest";

const getcustomers = () => {

    return function(dispatch){
        return Getcustomers().then((res) =>{
            dispatch({
                type: ActionTypes.GET_customer,
                payload: res.data,
            });
        });
    }
}; 

const postcustomers = (request) => {

    return async function(dispatch){
        return await Postcustomer(request).then((res) =>{
            console.log(res);
            dispatch({
                type: ActionTypes.SET_customer,
                payload: res.data,
                Response: res.status,
            });
        }).catch((error) =>{
            dispatch({
                type: ActionTypes.SET_customer,
                error: error,
            });
        });
    }
};

const updatecustomers = (request, id) => {

    return function(dispatch){
        return Putcustomers(request, id).then((res) =>{
            dispatch({
                type: ActionTypes.EDIT_customer,
                payload: res.data,
                Response: res.status,
            });
        }).catch((error) =>{
            dispatch({
                type: ActionTypes.EDIT_customer,
                error: error,
            });
        });
    }
};

const deletecustomer = (id) => {

    return function(dispatch){
        return deletecustomers(id).then((res) =>{
            console.log();
            dispatch({
                type: ActionTypes.REMOVE_customer,
                payload: res.data,
                Response: res.status,
            });
        }).catch((error) =>{
            dispatch({
                type: ActionTypes.REMOVE_customer,
                error: error,
            });
        });
    }
};

const cleancustomer = (method) => {

    return function(dispatch){
       if (method === "post") {
            dispatch({
                type: ActionTypes.SET_customer,
                Response: [],
            });
       }else if (method === "update") {
            dispatch({
                type: ActionTypes.EDIT_customer,
                Response: [],
            });
       }else if (method === "delete") {
            dispatch({
                type: ActionTypes.REMOVE_customer,
                Response: [],
            });
        }
    }
};


export { getcustomers, postcustomers, updatecustomers, deletecustomer, cleancustomer}; 