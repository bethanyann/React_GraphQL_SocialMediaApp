import React from 'react';
import { useQuery, gql } from '@apollo/client';
//import { gql } from 'graphql-tag';
import Postcard from '../components/Postcard';
import  { Spinner, Container, Row, Col }  from 'react-bootstrap';

const Home = () => {
    const {loading, data } = useQuery(FETCH_POSTS_QUERY);

    if(data)
    {
        console.log(data);
    }

    // const posts = data.getPosts;
    // console.log(posts);
    return (
       <Container className="temp-margin">
           <Row className="justify-content-md-center">
                <Col><h2> Recent Posts </h2></Col>
           </Row>
           <Row>
               { loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
               ) : (
                   data && data.getPosts.map(post => (
                        <Col key={post.id}>
                           <Postcard post={post} />
                        </Col>
                    ))
               )}
           </Row>
       </Container>
    );
}


const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id body createdAt username 
            likeCount 
            commentCount
            likes{
                username
            }
            comments{
                id username createdAt body
            }
        }
    }
  
`
export default Home;