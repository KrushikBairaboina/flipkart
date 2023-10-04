import * as actionTypes from '../constants/orderConstant';

export const getOrdersReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_ORDERS_SUCCESS:
            return { orders: action.payload }
        case actionTypes.GET_ORDERS_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};
const initialState = {
    loading: false,
    orders: null,
    error: '',
};

export const placeOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PLACE_ORDER_REQUEST:
            return { ...state, loading: true };
        case actionTypes.PLACE_ORDER_SUCCESS:
            return { ...state, loading: false, orders: action.payload };
        case actionTypes.PLACE_ORDER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};