import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setContext } from 'apollo-link-context';

const authLink = setContext(() => {
  //get token from local storage and add to the Authorization header
  const token = localStorage.getItem('jwtToken');
  return{
    headers: {
      Authorization: token ? `Bearer ${token}` : ' '
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})
const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
 // uri: 'http://localhost:5000',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ApolloProvider client={client}>
        <App/>  
    </ApolloProvider> 
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
