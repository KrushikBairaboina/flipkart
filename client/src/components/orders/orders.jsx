import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, styled, Typography } from '@mui/material';
import { getOrders } from '../../redux/actions/orderAction';
import { DataContext } from '../../context/DataProvider';

const Wrapper = styled(Grid)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Order = () => {
  const { orders } = useSelector((state) => state.getOrders);
  const dispatch = useDispatch();
  const { account } = useContext(DataContext);

  useEffect(() => {
    if (account) {
      dispatch(getOrders());
    }
  }, [dispatch, account]);

  const generateSNO = () => {
    let sno = 1;
    return function () {
      return sno++;
    };
  };

  const getSNO = generateSNO();

  const userOrders = orders.filter((order) => order.username === account.username);
  const pendingOrders = userOrders.filter((order) => order.status !== 'Delivered');
  const completedOrders = userOrders.filter((order) => order.status === 'Delivered');

  return (
    <>
      {account ? (
        <Grid container spacing={2}>
          <Wrapper item xs={6}>
            <Typography>Total Orders: {userOrders.length}</Typography>
            <Typography>Pending Orders: {pendingOrders.length}</Typography>
            <Typography>Completed Orders: {completedOrders.length}</Typography>
          </Wrapper>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <h4>Pending Orders</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>SNO</strong></TableCell>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Image</strong></TableCell>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Quantity</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingOrders.map((order, index) => (
                    order.products.map((product, productIndex) => (
                      <TableRow key={productIndex}>
                        <TableCell>{getSNO()}</TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          <img
                            src={product.url}
                            alt={product.title.longTitle}
                            style={{ maxWidth: '100px' }}
                          />
                        </TableCell>
                        <TableCell>{product.title.longTitle}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{order.status}</TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <h4>Completed Orders</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>SNO</strong></TableCell>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Image</strong></TableCell>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Quantity</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {completedOrders.map((order, index) => (
                    order.products.map((product, productIndex) => (
                      <TableRow key={productIndex}>
                        <TableCell>{getSNO()}</TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          <img
                            src={product.url}
                            alt={product.title.longTitle}
                            style={{ maxWidth: '100px' }}
                          />
                        </TableCell>
                        <TableCell>{product.title.longTitle}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{order.status}</TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <p>Please log in to view your orders.</p>
      )}
    </>
  );
};

export default Order;
