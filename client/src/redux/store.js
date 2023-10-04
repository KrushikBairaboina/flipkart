
import { createStore,combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getProductDetailsReducer, getProductsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { getOrdersReducer, placeOrderReducer } from './reducers/ordersReducer';
import { editUserReducer } from './reducers/userReducer';
const reducer = combineReducers({
    getProducts: getProductsReducer,
    getOrders: getOrdersReducer,
    getProductDetails: getProductDetailsReducer,
    editUser: editUserReducer,
    cart: cartReducer,
    placeOrder:placeOrderReducer
});
const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store;