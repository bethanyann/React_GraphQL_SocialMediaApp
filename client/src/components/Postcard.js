import React from 'react';
import { Card, Image, Button, Badge, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const Postcard = (props) => {
    const { body, createdAt, id, username, likes, likeCount, commentCount } = props.post;
    return (
        <Card style={{width: '18rem'}}> 
            <Card.Body>
                <Image thumbnail={true} className="profile-photo" style={{maxWidth:50}} src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                <Card.Title>{username}</Card.Title> 
                <Card.Subtitle as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Subtitle>
                <Card.Text className="post-body">{body}</Card.Text>
                <Card.Footer>    
                            <Button onClick={likePost}>
                            Like  <FontAwesomeIcon icon={faThumbsUp}/> <Badge bg="secondary">{likeCount}</Badge>
                            </Button>
                    
                            <Button onClick={commentOnPost}>
                            Comment <FontAwesomeIcon icon={faCommentAlt}/>
                            {/* <Badge bg="secondary">{commentCount}</Badge>  */}
                            </Button>
                </Card.Footer>
            </Card.Body>
        </Card>       
    )
}

function likePost() {
    console.log('LikePost!');
}

function commentOnPost() {
    console.log('comment !');
}
export default Postcard;