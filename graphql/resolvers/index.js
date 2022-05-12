const postsResolvers = require('./posts');
const usersResolvers = require('./users');

//combine all of the resolvers into one file to import right here
module.exports= {
    Query: {
        ...postsResolvers.Query  //spread operator to grab the one query from the posts.js resolvers file
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
}