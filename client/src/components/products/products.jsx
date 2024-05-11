import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { getProducts } from '../../redux/actions/productActions';
import { useNavigate } from 'react-router-dom';


const StyledTitle = styled(Typography)`
  && {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const StyledDescription = styled(Typography)`
  && {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Product = () => {
  const { products } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`); 
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Grid container rowSpacing={5} columnSpacing={4} style={{justifyContent:"center",marginTop:"10px",marginBottom:"25px",  background: "linear-gradient( to bottom,#DDAF94,#E8CEBF, #FDF8F5)"}} >
      {products.map((product) => (
        <Grid item  key={product.id} xs = "auto" >
         

          <Card onClick={() => goToProductPage(product.id)} style={{width:"350px",height:"400px",  boxShadow: "20px 20px 30px rgba(0, 0, 0, 0.02)"}}>
            <CardActionArea>
              <CardMedia component="img" alt={product.title.shortTitle}   image={product.url} style={{ borderRadius: '8px', height: '240px', width: '100%', objectFit: 'scale-down'}}/>
              <CardContent>
                <StyledTitle variant="body1">
                <strong>Category:</strong> {product.title.shortTitle}
                </StyledTitle>
                <StyledTitle variant="body1">
                  <strong>Title:</strong> {product.title.longTitle.length > 50 ? `${product.title.longTitle.substring(0, 50)}...` : product.title.longTitle}
                </StyledTitle>
                <Typography variant="body1">
                  <strong>Price:</strong> {product.price.cost}
                </Typography>
                <StyledDescription variant="body2">
                  <strong>Description:</strong> {product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
                </StyledDescription>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Product;
