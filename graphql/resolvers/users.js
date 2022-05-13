const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { validateRegisterInput, validateLoginInput } = require('../../utilities/validation');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

//create a resolver in the mutation for the register funtion in typeDefs.js
module.exports = {
    Mutation: { //ok so this is like a 'POST'  
        // args=RegisterInput object
        // register(parent, args, context, info){
        async register(parent, { registerInput : {username, email, password, confirmPassword}}) {
            // validate user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid)
            {
                throw new UserInputError('errors', { errors });
            }
            // make sure user does not already exist - think this can probably be put into the validation file in utilities? 
            const user = await User.findOne({ username });
            if(user){
                //use an apollo error here instead of just returning a generic error
                //the payload will have an error message and an error object
                throw new UserInputError('Username is taken', {
                    errors:{
                        username: 'This username is taken'
                    }
                });
            }
            // hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email: email,
                username: username,
                password: password,
                createdAt: new Date().toISOString()
            });

            const result = await newUser.save(); //save new user to the database 
            const token = generateToken(result); //generate a token for the user in the helper method

            return {
                ...result._doc, //I don't understand what this is or what it's doing
                id: result._id,
                token
            }
        },
        async login(parent, {username, password})
        {
            const {errors, valid } = validateLoginInput(username, password);

            if(!valid)
            {
                throw new UserInputError('Errors',{errors});
            }
            //get the user from the database because if it doesn't exist we need to return an error here
            const user = await User.findOne({ username });
            if(!user){
                errors.general = 'Username does not exist';
                throw new UserInputError('Username does not exist', {errors});
            }
            
            //now check if the password the user entered matches the one they've got saved
            const passwordMatches = await bcrypt.compare(password, user.password);
            if(!passwordMatches)
            {
                errors.general = 'Incorrect password';
                throw new UserInputError('Incorrect password', {errors});
            }
        
            //if validation passes issue the user a token
            const token = generateToken(user);

            return {
                ...user._doc, //I don't understand what this is or what it's doing
                id: user._id,
                token
            }
        }
     }
}

//helper method to generate a user token on
function generateToken(user){
    //the .sign() method takes a payload(the data you want to send in the token) as an argument and a secret or secret key, as well as options 
    return jwt.sign({
       id: user.id,
       email: user.email,
       username: user.username
   }, 
   SECRET_KEY, 
   {expiresIn: '1h'});
}