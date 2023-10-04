
import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Paper, TextField, Typography, styled } from '@mui/material';
import { DataContext } from '../../context/DataProvider';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editUser } from '../../redux/actions/userAction';
const EditSellerContainer = styled(Container)`
  margin-top: 100px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const EditSellerHeader = styled(Typography)`
  margin-bottom: 20px;
`;

const EditSellerForm = styled('form')`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 20px;
  }
`;

const EditSellerInput = styled(TextField)`
  margin-bottom: 10px;
`;

const EditSellerButton = styled(Button)`
  align-self: flex-start;
`;
const Account = () => {
  const { userId } = useParams();
    const { account } = useContext(DataContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: account.id || '',
    firstname: account.firstname || '',
    lastname: account.lastname || '',
    username: account.username || '',
    email: account.email || '',
    password: account.password || '',
    phone: account.phone || '',
  });
  useEffect(() => {
    if(Array.isArray(account)&& userId){
    const user = account.find((user) => user.id === userId);

    if (user) {
      setUserData(user);
    }
    }
  }, [userId, account]);
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await dispatch(editUser(userData,userId));
          navigate('/');
        } catch (error) {
          console.error('Error editing user:', error);
        }
      };
  return (
    <EditSellerContainer>
      <Paper elevation={3}>
        <EditSellerHeader variant="h4" component="h2" gutterBottom>
          Edit User
        </EditSellerHeader>
        <EditSellerForm onSubmit={handleSubmit}>
        <EditSellerInput
            fullWidth
            label="Seller id"
            name="id"
            value={userData.id}
            onChange={handleChange}
            placeholder="Enter User id" 
          />
          <EditSellerInput
            fullWidth
            label="Firstname"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            placeholder="Enter Firstname" 
          />
          <EditSellerInput
            fullWidth
            label="Lastname"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            placeholder="Enter Lastname" 
          />
          <EditSellerInput
            fullWidth
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Enter Sellername" 
          />
          <EditSellerInput
            fullWidth
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter Email" 
          />
          <EditSellerInput
            fullWidth
            label="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter Password" 
          />
          <EditSellerInput
            fullWidth
            label="Phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Enter Phone no" 
          />
          <EditSellerButton type="submit" variant="contained" color="primary">
            Update
          </EditSellerButton>
        </EditSellerForm>
      </Paper>
    </EditSellerContainer>
  );
};

export default Account;