import {
  ORDER_FIND_ERR,
  ORDER_FIND_REQUEST,
  ORDER_FIND_SUCCESS,
  ORDER_STATUSCHANGE_ERR,
  ORDER_STATUSCHANGE_REQUEST,
  ORDER_STATUSCHANGE_SUCCESS,
} from "../Constants/orderContant";

export const orderFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_FIND_REQUEST:
      return {
        ...state,
        orderFindLoading: true,
      };
    case ORDER_FIND_SUCCESS:
      return {
        ...state,
        orderFindLoading: false,
        orderFindSuccess: action.payload,
      };
    case ORDER_FIND_ERR:
      return {
        ...state,
        orderFindLoading: false,
        orderFindErr: action.payload,
      };
    default:
      return state;
  }
};

export const orderStatusChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_STATUSCHANGE_REQUEST:
      return {
        ...state,
        orderStatusChangeLoading: true,
      };
    case ORDER_STATUSCHANGE_SUCCESS:
      return {
        ...state,
        orderStatusChangeLoading: false,
        orderStatusChangeSuccess: action.payload,
      };
    case ORDER_STATUSCHANGE_ERR:
      return {
        ...state,
        orderStatusChangeLoading: false,
        orderStatusChangeErr: action.payload,
      };
    default:
      return state;
  }
};
