const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema');
const app = express();

// TODO - Graphql MiddelWare

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


// TODO - Listen server at specific port
app.listen(4000, (_err) => {
    if (_err) {
        console.log(_err.message)
    }
    console.log('Listining at port 4000');
})