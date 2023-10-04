
import axios from "axios";
import * as actionTypes from '../constants/orderConstant';
const URL = 'http://localhost:8000';

export const getOrders = () => async(dispatch) => {
    try {
        const {data} = await axios.get(`${URL}/orders`);

        dispatch({type: actionTypes.GET_ORDERS_SUCCESS, payload:data })
    } 
    catch (error) {
        dispatch({type: actionTypes.GET_ORDERS_FAIL,payload:error.message})
    }
}
export const placeOrder = (orderData) => async (dispatch) => {
    try {
      console.log("Order Data (before API call):", orderData);
      dispatch({ type: actionTypes.PLACE_ORDER_REQUEST });
  
      const response = await axios.post(`${URL}/orders`, orderData);
      const newOrder = response.data; 
  
      console.log("Order Data (after API call):", orderData);
      console.log("Response:", newOrder);
  
      dispatch({ type: actionTypes.PLACE_ORDER_SUCCESS, payload: newOrder });
    } catch (error) {
      console.error("Error placing order:", error);
      dispatch({ type: actionTypes.PLACE_ORDER_FAIL, payload: error.message });
    }
};
