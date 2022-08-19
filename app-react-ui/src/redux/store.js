import { createStore } from "redux";
import reducers from "./reducers/index"
import { composeWithDevTools } from 'redux-devtools-extension';

import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore( reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;