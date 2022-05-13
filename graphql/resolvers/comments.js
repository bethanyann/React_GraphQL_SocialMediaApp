const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const User = require('../../models/User');

const checkAuth = require('../../utilities/check-auth');

module.exports = {
    Mutation: {
        //need the context to make sure the user is actually logged in
        createComment: async (parent, { postId, body }, context) => {
            
            try{
                //get the user
                 const user = checkAuth(context);
                if(body.trim() === ''){  //the comment is empty
                    throw new UserInputError('Comment is empty', {
                        errors: {
                            body: 'Comment body must not be empty'
                        }
                    })
                }
                const post = await Post.findById(postId);

                if(post) //if the post is not null
                {
                    //mongoose turns the data models into normal javascript objects so we can access the comments array just like this
                    //post.comments;
                    post.comments.unshift({
                        body:body,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                    await post.save();
                    return post;
                } else throw new UserInputError('Post not found');

            } catch(err){
                throw new AuthenticationError('User is not logged in', err);
            }
           
        },
        async deleteComment(parent, {postId, commentId}, context) 
        {
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                //find comment in index of post's comments and then delete it
                const commentIndex = post.comments.findIndex(c => c.id == commentId);

                //if the owner of the comment is the user trying to delete it - not really necessary but more of a safty check in case a user tries to delete someone elses' comment
                if(post.comments[commentIndex].username === user.username)
                {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }
                else {
                    throw new AuthenticationError('Action prohibited')
                }
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
}
