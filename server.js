var express = require('express');
var cors = require('cors')
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

//var corsOptions = { origin: process.env.CORS_FRONTEND };

var app = express();
app.options('*', cors())
app.use(cors())


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT);
console.log('Running a GraphQL API server');
