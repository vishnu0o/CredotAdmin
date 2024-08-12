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

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        productCreateLoading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        productCreateLoading: false,
        productCreateSuccess: action.payload,
      };
    case PRODUCT_CREATE_ERR:
      return {
        ...state,
        productCreateLoading: false,
        productCreateErr: action.payload,
      };
    default:
      return state;
  }
};

export const productFindReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FIND_REQUEST:
      return {
        ...state,
        productFindLoading: true,
      };
    case PRODUCT_FIND_SUCCESS:
      return {
        ...state,
        productFindLoading: false,
        productFindSuccess: action.payload,
      };
    case PRODUCT_FIND_ERR:
      return {
        ...state,
        productFindLoading: false,
        productFindErr: action.payload,
      };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return {
          ...state,
          productUpdateLoading: true,
        };
      case PRODUCT_UPDATE_SUCCESS:
        return {
          ...state,
          productUpdateLoading: false,
          productUpdateSuccess: action.payload,
        };
      case PRODUCT_UPDATE_ERR:
        return {
          ...state,
          productUpdateLoading: false,
          productUpdateErr: action.payload,
        };
      default:
        return state;
    }
  };


  export const productStatusChangeReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_STATUSCHANGE_REQUEST:
        return {
          ...state,
          productStatusChangeLoading: true,
        };
      case PRODUCT_STATUSCHANGE_SUCCESS:
        return {
          ...state,
          productStatusChangeLoading: false,
          productStatusChangeSuccess: action.payload,
        };
      case PRODUCT_STATUSCHANGE_ERR:
        return {
          ...state,
          productStatusChangeLoading: false,
          productStatusChangeErr: action.payload,
        };
      default:
        return state;
    }
  };