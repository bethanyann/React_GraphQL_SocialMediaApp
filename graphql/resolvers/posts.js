const Post = require('../../models/Post');

module.exports = {
    //for each query or subscription it has a corresponding resolver which processes some logic and returns what the query needs
    Query: {
       async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            }catch(err){
                throw new Error(err);
            }
       }
    }
}
