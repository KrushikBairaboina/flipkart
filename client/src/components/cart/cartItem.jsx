import React, { useState } from "react";
import { Box, Typography, styled, ButtonGroup, Button } from "@mui/material";
import { addEllipsis } from "../../utils/common-utils";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Component = styled(Box)`
  border-top: 1px solid #f0f0f0;
  border-radius: 0px;
  display: flex;
  background: #fff;
`;

const Quantity = styled(ButtonGroup)`
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  border-radius: 50%;
`;

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const Remove = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
  color: #000;
  font-weight: 600;
`;

const CartItem = ({ item, onQuantityChange }) => {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";
  const dispatch = useDispatch();

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const [quantity, setQuantity] = useState(item.quantity);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity); 
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity); 
    }
  };

  const itemTotalPrice = item.price.cost * quantity;

  return (
    <Component>
      <LeftComponent>
        <img
          src={item.url}
          alt="product"
          style={{ height: 110, width: 110 }}
        />
        <Quantity>
          <StyledButton onClick={decreaseQuantity}>-</StyledButton>
          <Button>{quantity}</Button>
          <StyledButton onClick={increaseQuantity}>+</StyledButton>
        </Quantity>
        <Typography>Total Price: ₹{itemTotalPrice}</Typography>
      </LeftComponent>
      <Box style={{ margin: 20 }}>
        <Typography>{addEllipsis(item.title.longTitle)}</Typography>
        <SmallText>
          Seller: RetailNet
          <Box component="span">
            <img src={fassured} style={{ width: 50, marginLeft: 10 }} />
          </Box>
        </SmallText>
        <Typography style={{ margin: "20px 0" }}>
          <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
            ₹{item.price.cost}
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#878787" }}>
            <strike>₹{item.price.mrp}</strike>
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#388E3C" }}>
            {item.price.discount} off
          </Box>
        </Typography>
        <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
      </Box>
    </Component>
  );
};

export default CartItem;
