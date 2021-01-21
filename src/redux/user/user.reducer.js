import UserActionsTypes from "./user.types";

const INTIAL_STATE = {
  currentUser: null
};
const UserReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.SIGN_IN_SUCCESS:
      
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionsTypes.SIGN_IN_FAILURE:
    case UserActionsTypes.SIGN_OUT_FAILURE:
    case UserActionsTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case UserActionsTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    default:
      return state;
  }
};
export default UserReducer;
