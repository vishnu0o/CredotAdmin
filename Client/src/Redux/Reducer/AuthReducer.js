import {
  AUTH_LOGIN_ERR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from "../Constants/AuthConstant";

export const authLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        authLoginLoading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authLoginLoading: false,
        authLoginSuccess: action.payload,
      };
    case AUTH_LOGIN_ERR:
      return {
        ...state,
        authLoginLoading: false,
        authLoginErr: action.payload,
      };
    default:
      return state;
  }
};
