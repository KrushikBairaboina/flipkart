import express from  'express';
import { userSignUp,userLogIn, editUser } from '../controller/user-controller.js';
import { getProducts,getProductById } from '../controller/product-controller.js';
import { getOrders, placeOrder } from '../controller/order-controller.js';
const router = express.Router();
router.post('/signup',userSignUp);
router.post('/login',userLogIn);
router.get('/orders',getOrders);
router.get('/products',getProducts);
router.get('/product/:id', getProductById);
router.put('/account/:id',editUser);
router.post('/orders', placeOrder);
export default router;