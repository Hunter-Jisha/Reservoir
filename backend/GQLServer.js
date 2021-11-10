var express = require('express');
var {graphqlHTTP} = require('express-graphql');
var { makeExecutableSchema } = require("@graphql-tools/schema")

var schema, root

function init(typeDefs, resolvers)
{
    schema = makeExecutableSchema(
        {
            typeDefs: typeDefs,
            resolvers: resolvers,
        }
    );
}

function start()
{
    var app = express();
    app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    }));
    app.listen(4000);
}

module.exports = {init, start}