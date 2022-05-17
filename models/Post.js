const { model, Schema } = require('mongoose');

//MongoDB is schemaless but sometimes it is safer to make a schema anyway just to avoid data mismatches and errors
const postSchema = new Schema({
    body: String, 
    username: String,
    createdAt: String,
    commentCount: Number,
    likeCount: Number,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,  // this is how you do a relationship in mongo, even though its non-relational you can build relationships in the ORM
        ref: 'users'  //pass it the table or collection that is used
    }
});

//export the model with the name it has and the schema to pair it with
module.exports = model('Post', postSchema);