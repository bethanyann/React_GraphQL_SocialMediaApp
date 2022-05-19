import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';


const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    //check whether or not the token is expired or not by using jwt decode to decode the expiration time inside the token
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    //check the expiration time of the token
    if(decodedToken.exp * 1000 < Date.now()){
        //if token is expired, remove from the local storage
        localStorage.removeItem('jwtToken');
    }else {
        //set user in the initial state to token
        initialState.user = decodedToken;
    }
}

//create the defs of the functions and user object that the context will take 
const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

//create a reducer.  this is an unfamiliar concept but hey lets see how it goes
//it recieves an action with a type and a payload and then it determines what to do with it
//it also takes the state because it needs to be able to change the state


function authReducer(state, action){
    switch(action.type)
    {
        case 'LOGIN':
            return{
                ...state, user: action.payload
            }
        case 'LOGOUT': 
            return {
                ...state, user: null
            }
        default:
            return state;
        
    }
}

//now we need to use this reducer somewhere, and we will use it in the AuthProvider
function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);  //need to look up more info on hooks here 

    //write the login and logout functions to pass down through the component tree
    const login = (userData) => {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
        dispatch({
            type: 'LOGOUT'
        })
    }

    return(
        <AuthContext.Provider  value={{user: state.user, login, logout}} {...props}/>
    )
}

export { AuthContext, AuthProvider }