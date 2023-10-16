export const typeDefs = `#graphql
    type Query {
        authors: [Author]
        books: [Book]
        getAuthorById(_id: String!): Author
        getBookById(_id: String!): Book
        booksByGenre(genre: String!): [Book]
        booksByPriceRange(min: Float!, max: Float!): [Book]
        searchAuthorsByName (searchTerm: String!): [Author]
    }

    type Book {
        _id: String
        title: String
        genres: [String]
        publicationDate: String
        publisher: String
        summary: String
        isbn: String
        language: String
        pageCount: Int
        price: Float
        format: [String]
        author: Author
    }
      
    type Author {
        _id: String
        first_name: String
        last_name: String
        date_of_birth: String
        hometownCity: String
        hometownState: String
        numOfBooks: Int
        books(limit: Int): [Book]
    }

    type Mutation {
        addAuthor(
            first_name: String!
            last_name: String!
            date_of_birth: String!
            hometownCity: String! 
            hometownState: String!
        ): Author
        editAuthor(
            _id: String!
            first_name: String
            last_name: String
            date_of_birth: String
            hometownCity: String
            hometownState: String
        ): Author
        removeAuthor(_id: String!): Author
        addBook(
            title: String!
            genres: [String!]!
            publicationDate: String!
            publisher: String!
            summary: String!
            isbn: String!
            language: String!
            pageCount: Int!
            price: Float!
            format: [String!]!
            authorId: String!
        ): Book
        editBook(
            _id: String!
            title: String
            genres: [String]
            publicationDate: String
            publisher: String
            summary: String
            isbn: String
            language: String
            pageCount: Int
            price: Float
            format: [String]
            authorId: String
        ): Book
        removeBook(_id: String!): Book
    }
`;