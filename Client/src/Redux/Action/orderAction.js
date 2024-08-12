import axios from "../../Axios/config";
import {
  ORDER_FIND_ERR,
  ORDER_FIND_REQUEST,
  ORDER_FIND_SUCCESS,
  ORDER_STATUSCHANGE_ERR,
  ORDER_STATUSCHANGE_REQUEST,
  ORDER_STATUSCHANGE_SUCCESS,
} from "../Constants/orderContant";

// OrderFind Action

export const orderFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_FIND_REQUEST });

    let { data } = await axios.get("/order/findOrder");

    dispatch({ type: ORDER_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: ORDER_FIND_ERR, payload: error.response.data });
  }
};

// OrderStatusChange Action

export const orderStatusChangeAction = (status, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_STATUSCHANGE_REQUEST });

    let { data } = await axios.put("/order/statusChangeOrder", { status, id });

    dispatch({ type: ORDER_STATUSCHANGE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response, "error.response");
    dispatch({ type: ORDER_STATUSCHANGE_ERR, payload: error.response.data });
  }
};
