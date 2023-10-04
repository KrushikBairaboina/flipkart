import React, { Component } from 'react';
import Header from './components/header/header';
import Home from './components/home/home';
import DataProvider from './context/DataProvider';
import { Box } from '@mui/material';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';

class App extends Component {
  render() {
    return (
      <DataProvider>
        <BrowserRouter>
        <Header/>
        <Box style={{marginTop: 54}}>
        <Routes>
          <Route path= '/' element={<Home />} />
          <Route path= '/product/:id' element={<DetailView/>}/>
          <Route path= '/cart' element={<Cart/>}/>
        </Routes>
        </Box>
        </BrowserRouter>
      
      </DataProvider>
    );
  }
}

export default App;
