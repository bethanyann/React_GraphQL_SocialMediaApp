import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from '../utilities/hooks';
import { useMutation, gql } from '@apollo/client';


const PostForm = () => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [ createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values, 
        update(proxy, result){
            console.log(result);
            values.body = ''
        }
    });

    function createPostCallback() {
        createPost()
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a Post: </h2>
            <Form.Group>
                <Form.Control placeholder="Hi World!" name="body" onChange={onChange} value={values.body} />
                <Button type='submit'> Submit </Button>
            </Form.Group>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdAt username
        likes{
            id username createdAd
        }
        likeCount
        comments{
            id body username createdAt
        }
        commentCount
    }
}
`

export default PostForm;