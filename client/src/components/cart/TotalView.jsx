import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
  color: #878787;
`;

const Container = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  & > p {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const Price = styled(Typography)`
  float: right;
`;

const TotalAmount = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  border-top: 1px dashed #e0e0e0;
  padding: 20px 0;
  border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
  font-size: 16px;
  color: green;
`;

const TotalView = ({ cartItems }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [mrp,setMrp] = useState(0);
 

  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const totalAmount = () => {
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalMrp = 0;


    cartItems.forEach((item) => {
   
      const itemTotalPrice = item.price.cost * item.quantity;
      const itemTotalMrp = item.price.mrp * item.quantity;
   
      const itemTotalDiscount = (item.price.mrp - item.price.cost) * item.quantity;

      totalPrice += itemTotalPrice;
      totalDiscount += itemTotalDiscount;
      totalMrp += itemTotalMrp;
    });

    setPrice(totalPrice);
    setDiscount(totalDiscount);
    setMrp(totalMrp);
  };

  return (
    <Box>
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
          Price ({cartItems.length} items)
          <Price component="span">₹{mrp}</Price>
        </Typography>
        <Typography>
          Discount
          <Price component="span">-₹{discount}</Price>
        </Typography>
        <Typography>
          Delivery Charges
          <Price component="span">₹40</Price>
        </Typography>
        <TotalAmount>
          Total Amount
          <Price>₹{mrp - discount + 40}</Price>
        </TotalAmount>
        <Discount>You will save ₹{discount - 40} on this order</Discount>
      </Container>
    </Box>
  );
};

export default TotalView;
