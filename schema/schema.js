const graphql = require('graphql');
const_ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

// TODO - Dummy data
var books = [
    { name: 'Name of wind', genre: 'fantsy', id: '1' },
    { name: 'Name of fire', genre: 'scifi', id: '2' },
    { name: 'Name of manikant', genre: 'thriller', id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parnet, args) {
                // ToDo - code to get data from db/other source
                return _find(books, { id: args.id });

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: rootQuery,

});