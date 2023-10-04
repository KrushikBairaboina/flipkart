
import * as actionTypes from '../constants/userConstant';
export const editUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case actionTypes.EDIT_USER_SUCCESS:
        return { user: action.payload };
      case actionTypes.EDIT_USER_FAIL:
        return { error: action.payload };
      default:
        return state;
    }
  };
