const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag'); //one of the dependencies of apollo server
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }) //takes the request body and forwards it to the context so we can access the request
})

//connect to db before starting the server
mongoose.connect(MONGODB, {useNewUrlParser: true}).then(() => {
    console.log('MongoDB connected');
    return server.listen({ port : 5000 });
}).then(res => {
    console.log(`server running at ${res.url}`);
});


// server.listen({ port: 5000 }).then(res => {
//     console.log(`server running at ${res.url}`)
// });