
import User from "../model/user-schema.js";


export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json({ message: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
export const userLogIn = async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;
        let user = await User.findOne({ username: username, password:password });
        if(user) {
            return response.status(200).json({data:user});
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}
export const editUser = async (request, response) => {
    try {
      const userId = request.params.id; 
      
      const existingUser = await User.findOne({ id: userId });
      
      if (!existingUser) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      const editedUserData = request.body;

      Object.assign(existingUser, editedUserData);
  
      await existingUser.save();
  
      response.status(200).json({ message: 'user updated successfully', user: existingUser });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
