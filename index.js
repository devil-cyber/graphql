const express = require('express');
const {
    graphqlHTTP
} = require('express-graphql')
const schema = require('./schema/schema');
const db = require('./config/mongoose');
const dotenv = require('dotenv').config();
const app = express();

// TODO - Graphql MiddelWare

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


// TODO - Listen server at specific port
app.listen(process.env.PORT, (_err) => {
    if (_err) {
        console.log(_err.message)
    }
    console.log('Listining at port', process.env.PORT);
})