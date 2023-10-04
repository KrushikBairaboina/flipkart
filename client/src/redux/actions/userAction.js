
import axios from "axios";
import * as actionTypes from '../constants/userConstant';
const URL = 'http://localhost:8000';
export const editUser = (userData, userId) => async (dispatch) => {
    if (userId) {
      try {
        const response = await axios.put(`${URL}/account/${userId}`, userData);
        const updatedUser = response.data;
        dispatch({
          type: actionTypes.EDIT_USER_SUCCESS,
          payload: updatedUser,
        });
      } catch (error) {
        dispatch({
          type: actionTypes.EDIT_USER_FAIL,
          payload: error.message,
        });
      }
    } else {
      console.error('UserId is undefined'); 
    }
  };