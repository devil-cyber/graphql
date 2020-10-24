const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull,
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
                //  return _.find(authors, {
                //     id: parent.authorId
                // })
                return Author.findById(parent.authorId);
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
                // return _.filter(books, {
                //     authorId: parent.id
                // })
                return Book.find({
                    authorId: parnet.id
                });
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
                // return _.find(books, {
                //     id: args.id
                // });
                return Book.findById(args.id);

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
                // return _.find(authors, {
                //     id: args.id
                // });
                return Author.findById(args.id);
            }

        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            }

        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation

});