import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { authLoginReducer } from "./Redux/Reducer/AuthReducer";
import {
  productCreateReducer,
  productFindReducer,
  productStatusChangeReducer,
  productUpdateReducer,
} from "./Redux/Reducer/ProductReducer";
import {
  orderFindReducer,
  orderStatusChangeReducer,
} from "./Redux/Reducer/orderReducer";

let Middleware = [thunk];

const appReducer = combineReducers({
  authLogin: authLoginReducer,
  productCreate: productCreateReducer,
  productFind: productFindReducer,
  productUpdate: productUpdateReducer,
  productStatusChange: productStatusChangeReducer,
  orderFind: orderFindReducer,
  orderStatusChange: orderStatusChangeReducer,
});

export const store = createStore(appReducer, applyMiddleware(...Middleware));
