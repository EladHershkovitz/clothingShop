import { UserActionsTypes } from "./user.types";

const INTIAL_STATE = {
  currentUser: null
};
const UserReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
};
export default UserReducer;
