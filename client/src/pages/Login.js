import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useForm } from '../utilities/hooks';

import { AuthContext } from '../context/auth';

const Login = (props) => {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    // set default values
    const initialState = {
        username:'',
        password: ''
    }
  
    const { onChange, onSubmit, values } = useForm(loginCallback, initialState);

    const [ loginUser ]= useMutation(LOGIN_USER, {
        //this will be triggered if the mutation is successfully executed
        update(proxy, { data: {login : userData }}){
            console.log(userData);
            context.login(userData);
            navigate('/', {replace:true});
        },
        onError(err) {
            debugger;
            if(err.graphQLErrors.length > 0)
            {
                setErrors(err.graphQLErrors[0].extensions.errors);  
            }    
        },
        variables: values
        
    });

    function loginCallback() {
        loginUser();
    }

    return (
        <div className="temp-margin">
            <h1 className="text-center bottom-margin"> Login </h1>
            <Form className="form-container" onSubmit={onSubmit} >
                {Object.keys(errors).length > 0 && (
                    <div className="">
                        {Object.values(errors).map(value => (
                            <Alert key={value} variant="danger">{value}</Alert>
                        ))}
                    </div>
                )}
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Username" value={values.username} onChange={onChange}/>
                </Form.Group>
                <br/>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={onChange}/>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label> </Form.Label>
                    <Button type="submit" className="register-button"> Login</Button>
                </Form.Group>
            </Form>
            
        </div>
    );
    
}

const LOGIN_USER = gql`
    mutation login (
        $username: String!
        $password: String!
    ) {
        login (       
            username: $username
            password: $password
        ){
            id email username createdAt token
        }
    }
`

export default Login;