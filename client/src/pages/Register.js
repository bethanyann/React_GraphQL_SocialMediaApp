import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";


const Register = (props) => {
    // set default values
    const [values, setValues] = useState({
        username:'',
        email:'',
        password: '',
        confirmPassword: ''
    });
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const onChange = (event) => {
        debugger;
        setValues({...values, [event.target.name]: event.target.value});
         //   setValues({values: event.target.value})
    }

    const onSubmit = (event) => {     
        event.preventDefault();
        addUser();
       // navigate('/', {replace:true}); //test to see if the one in the update method works 
    }

    const [addUser, {loading} ]= useMutation(REGISTER_USER, {
        //this will be triggered if the mutation is successfully executed
        
        update(proxy, result){
            debugger;
            console.log(result);
            //redirect to the home page
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

    return (
        <div className="temp-margin">
            <h1 className="text-center bottom-margin"> Register New User </h1>
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
                    <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Email Address" value={values.email} onChange={onChange}/>
                    {/* <Form.Text className="text-muted">We will never share your email with anyone else.</Form.Text> */}
                </Form.Group>
                <br/>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={onChange}/>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <br/>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} onChange={onChange}/>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label> </Form.Label>
                    <Button type="submit" className="register-button"> Register </Button>
                </Form.Group>
            </Form>
            
        </div>
    );
    
}

const REGISTER_USER = gql`
    mutation register (
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        register(
            registerInput: {
            username: $username
            password: $password
            confirmPassword: $confirmPassword
            email: $email
        }){
            id email username createdAt token
        }
    }
`

export default Register;