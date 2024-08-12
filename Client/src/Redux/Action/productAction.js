import axios from "../../Axios/config";
import {
  PRODUCT_CREATE_ERR,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_FIND_ERR,
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
  PRODUCT_STATUSCHANGE_ERR,
  PRODUCT_STATUSCHANGE_REQUEST,
  PRODUCT_STATUSCHANGE_SUCCESS,
  PRODUCT_UPDATE_ERR,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstant";

// ProductCreate Action

export const ProductCreateAction = (
  name,
  price,
  category,
  description
) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    let { data } = await axios.post("/product/createProduct", {
      name,
      price,
      category,
      description,
    });
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_CREATE_ERR, payload: error.response.data });
  }
};

// ProductFind Action

export const ProductFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_FIND_REQUEST });
    let { data } = await axios.get("/product/findProduct");
    dispatch({ type: PRODUCT_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_FIND_ERR, payload: error.response.data });
  }
};

// ProductUpdate Action

export const ProductUpdateAction = (
  name,
  price,
  category,
  description,
  id
) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    let { data } = await axios.put("/product/updateProduct", {
      name,
      price,
      category,
      description,
      id,
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_UPDATE_ERR, payload: error.response.data });
  }
};

// ProductStatusChange Action

export const ProductStatusChangeAction = (status, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_STATUSCHANGE_REQUEST });
    let { data } = await axios.put("/product/statusChangeProduct", {
      status,
      id,
    });
    dispatch({ type: PRODUCT_STATUSCHANGE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: PRODUCT_STATUSCHANGE_ERR, payload: error.response.data });
  }
};
