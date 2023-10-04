import React from "react";
import { useState } from 'react';
import {AppBar,Box,Toolbar, Typography,IconButton,styled, Drawer, List, ListItem} from '@mui/material';
import Search from "./search";
import CustomButtons from "./CustomButtons";
import {Menu} from '@mui/icons-material';
import { Link } from "react-router-dom";
const StyleHeader = styled(AppBar)`
background: #2874f0;
height: 55px;
`;
const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0;
    color:inherit;
    text-decoration: none;
`;
const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
`;
const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
});
const CustomButtonWrapper = styled('Box')(({ theme }) => ({ 
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));
const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));


const Header = () =>{
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
    

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <ListItem button>
                    <CustomButtons/>
                </ListItem>
            </List>
        </Box>
    )

    return(
    <StyleHeader>
    
    <Toolbar style={{ minHeight: 55 }}>
    <MenuButton color="inherit" onClick={handleOpen}>
    <Menu/>
    </MenuButton >  
    <Drawer open={open} onClose={handleClose}>
        {list()}
    </Drawer>
        <Component to='/'>
                <img src={logoURL} alt="logo" style={{width:75}}/>
                <Box component="span" style={{ display: 'flex' }}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{color:'#FFE500'}}>
                                Plus
                            </Box>
                        </SubHeading>
                        <PlusImage src={subURL} />
                </Box>
        </Component>

            
            <Search/>
            <CustomButtonWrapper>
                <CustomButtons/>
            </CustomButtonWrapper>
        </Toolbar>
    </StyleHeader>
    )
    
}
export default Header;