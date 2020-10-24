const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

// TODO - Dummy data
var books = [{
    name: 'Name of wind',
    genre: 'fantsy',
    id: '1',
    authorId: '1'
},
{
    name: 'Name of fire',
    genre: 'scifi',
    id: '2',
    authorId: '2'
},
{
    name: 'Name of manikant',
    genre: 'thriller',
    id: '3',
    authorId: '2'
}
]
var authors = [{
    name: 'Mani',
    age: 21,
    id: '1',
},
{
    name: 'Kant',
    age: 21,
    id: '2',
},
{
    name: 'Kumar',
    age: 21,
    id: '3',
}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {
                    id: parent.authorId
                })
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent)
                return _.filter(books, {
                    authorId: parent.id
                })
            }
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
                    type: GraphQLID
                }
            },
            resolve(parnet, args) {
                // ToDo - code to get data from db/other source
                return _.find(books, {
                    id: args.id
                });

            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parnet, args) {
                // ToDo - code to get data from db/other source
                return _.find(authors, {
                    id: args.id
                });
            }

        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }

        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: rootQuery,

});