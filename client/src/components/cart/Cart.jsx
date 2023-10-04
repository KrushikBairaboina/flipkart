import React, { useContext, useEffect,useState } from "react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, placeOrder } from "../../redux/actions/orderAction";
import TotalView from "./TotalView";
import CartItem from "./cartItem";
import EmptyCart from "./EmptyCart";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from 'react-router-dom';


const Container = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  
  display: "flex",
  
  [theme.breakpoints.down("md")]: {
    padding: "15px 0",
  },
}));
const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;
const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;
const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;
const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  const { orders } = useSelector((state) => state.getOrders);


  const [cartItemsWithQuantity, setCartItemsWithQuantity] = useState(cartItems);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {

    setCartItemsWithQuantity(cartItems);
  }, [cartItems]);

  const nextOrderNumber = orders.length + 1;
  const orderID = `order${nextOrderNumber}`;

  const products = cartItemsWithQuantity.map((item) => ({
    url: item.url,
    detailUrl: item.detailUrl,
    title: item.title,
    quantity: item.quantity,
    price: item.price.cost * item.quantity,
    description: item.description,
  }));

  const handlePlaceOrder = () => {
    if (!account) {
      alert("Please log in to place an order.");
      return;
    }
 
    const orderData = {
        id: orderID,
        username: account.username,
        status: "Placed",
        deliveryBoy: "Assign DBoy",
        products: products
    }
    console.log("Order Data:", orderData);
    dispatch(placeOrder(orderData));
    navigate('/orders');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
  
    const updatedCartItems = cartItemsWithQuantity.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

   
    setCartItemsWithQuantity(updatedCartItems);
  };

  return (
    <>
      {cartItemsWithQuantity.length ? (
        <Container container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart ({cartItemsWithQuantity.length})</Typography>
            </Header>
            {cartItemsWithQuantity.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                onQuantityChange={handleQuantityChange}
              />
            ))}
            <ButtonWrapper>
              <StyledButton onClick={() => handlePlaceOrder()}>
                Place Order
              </StyledButton>
            </ButtonWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView cartItems={cartItemsWithQuantity} />
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
