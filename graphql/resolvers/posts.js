const Post = require('../../models/Post');
const checkAuth = require('../../utilities/check-auth');

const { AuthenticationError } = require('apollo-server');

module.exports = {
    //for each query or subscription it has a corresponding resolver which processes some logic and returns what the query needs
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find().sort({createdAt: -1});  //saying createdAt -1 tells mongoose that we want them sorted by date from newest to oldest
                return posts;
            }catch(err){
                throw new Error(err);
            }
        },
        async getPost(parent, {postId}){
           try{
               const post = await Post.findById(postId);
                //if post exists, return it
               if(post) {
                   return post;
               } 
               else {
                   throw new Error('Post not found');
               }
           }catch(err){
               throw new Error(error);
           }
        }
    },
    Mutation: {
        async createPost(parent, { body }, context){
            //use the context to grab the authentication token and validate the user
            const user = checkAuth(context);
            if(user)
            {
                console.log(user);
                const newPost = new Post({
                    body,
                    user: user.id, 
                    username: user.username,
                    createdAt: new Date().toISOString()      
                });

                const post = await newPost.save();
                return post;
            }
        },
        async deletePost(parent, { postId, context})
        {
            const user = checkAuth(context);
            try{
                const post = await Post.findById(postId);

                //make sure the user is the awthor/owner of the post
                if(user.username === post.username){
                    await post.delete();
                    return 'Post successfully deleted';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }

            }catch(err)
            {
                throw new Error(err);
            }
        }
    }
}
