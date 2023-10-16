import {GraphQLError} from 'graphql';

import {
    authors as authorCollection,
    books as bookCollection
} from './config/mongoCollections.js';

import {v4 as uuid} from 'uuid';
import { UUID } from 'mongodb';

import redis from 'redis';

const client = redis.createClient();
client.connect().then(() => {});


export const resolvers = {
    Query: {
        authors: async () => {

            //cashe
            const exists = await client.exists('authors');
            if(exists){
                console.log('in cashe');
                return JSON.parse(await client.get('authors'));
            }

            const authors_ = await authorCollection();
            const allAuthors = await authors_.find({}).toArray();
            if(!allAuthors){
                throw new GraphQLError(`Internal Server Error`, {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            console.log('not in cashe')
            await client.setEx('authors', 3600, JSON.stringify(allAuthors));
            
            return allAuthors;
        },
        books: async () => {

            //cashe
            const exists = await client.exists('books');
            if(exists){
                console.log('in cashe');
                return JSON.parse(await client.get('books'));
            }

            const books_ = await bookCollection();
            const allBooks = await books_.find({}).toArray();
            if(!allBooks){
                throw new GraphQLError(`Internal Server Error`, {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            console.log('not in cashe')
            await client.setEx('books', 3600, JSON.stringify(allBooks));
            
            return allBooks;
        },
        getAuthorById: async (_, args) => {
            if(!args._id || args._id.trim().length === 0 || typeof args._id !== 'string'){
                throw new GraphQLError(`Invalid String - ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            args._id = args._id.trim();
            
            if(!UUID.isValid(args._id)){
                throw new GraphQLError(`Invalid ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            //cashe
            const exists = await client.exists(args._id);
            if(exists){
                console.log('in cashe');
                return JSON.parse(await client.get(args._id));
            }

            const authors_ = await authorCollection();
            const author = await authors_.findOne({_id: args._id});
            if(!author){
                throw new GraphQLError('Author Not Found', {
                    extensions: {code: 'NOT_FOUND'}
                });
            }

            console.log('not in cashe');
            await client.set(args._id, JSON.stringify(author));

            return author;
        },
        getBookById: async (_, args) => {
            if(!args._id || args._id.trim().length === 0 || typeof args._id !== 'string'){
                throw new GraphQLError(`Invalid String - ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            args._id = args._id.trim();
            
            if(!UUID.isValid(args._id)){
                throw new GraphQLError(`Invalid ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            //cashe
            const exists = await client.exists(args._id);
            if(exists){
                console.log('in cashe');
                return JSON.parse(await client.get(args._id));
            }

            const books_ = await bookCollection();
            const book = await books_.findOne({_id: args._id});
            if(!book){
                throw new GraphQLError('Book Not Found', {
                    extensions: {code: 'NOT_FOUND'}
                });
            }

            console.log('not in cashe');
            await client.set(args._id, JSON.stringify(book));
            
            return book;
        },
        booksByGenre: async (_, args) => {
            if(!args.genre || args.genre.trim().length === 0 || typeof args.genre !== 'string'){
                throw new GraphQLError(`Invalid String - Genre`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            args.genre = args.genre.toLowerCase();

            //cashe
            const exists = await client.exists(args.genre);
            if(exists){
                console.log('in cashe');
                return JSON.parse(await client.get(args.genre));
            }

            const books_ = await bookCollection();
            const matchedBooks = await books_.find({genres: {$regex: args.genre, $options: 'i'}}).toArray();
            if(!matchedBooks){
                throw new GraphQLError(`Internal Server Error`, {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            console.log('not in cashe');
            await client.setEx(args.genre, 3600, JSON.stringify(matchedBooks));

            return matchedBooks;
        },
        booksByPriceRange: async (_, args) => {
            if(typeof args.min !== 'number' || isNaN(args.min) || isNaN(args.max) || 
                typeof args.max !== 'number'|| args.max <= args.min){
                throw new GraphQLError(`Invalid Numbers - Min/Max`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            if(!Number.isInteger(args.min)){
                let converted = args.min.toString();
                converted = converted.split('.')[1];
                if(converted.length > 2){
                    throw new GraphQLError(`Invalid Min`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }
            }

            if(!Number.isInteger(args.max)){
                let converted = args.max.toString();
                converted = converted.split('.')[1];
                if(converted.length > 2){
                    throw new GraphQLError(`Invalid Max`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }
            }

            //cashe
            const key_ = `${args.min}/${args.max}`;
            const exists = await client.exists(key_);
            if(exists){
                console.log('in cashe');
                return JSON.parse(await client.get(key_));
            }


            const books_ = await bookCollection();
            const matchedBooks = await books_.find({price: {$gte: args.min, $lte: args.max}}).toArray();

            if(!matchedBooks){
                throw new GraphQLError(`Internal Server Error`, {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            console.log('not in cashe');
            await client.setEx(key_, 3600, JSON.stringify(matchedBooks));

            return matchedBooks;
            
        },
        searchAuthorsByName: async (_, args) => {
            if(!args.searchTerm || args.searchTerm.trim().length === 0 || typeof args.searchTerm !== 'string'){
                throw new GraphQLError(`Invalid String - Search Term`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            args.searchTerm = args.searchTerm.toLowerCase();

            const exists = await client.exists(args.searchTerm);
            if(exists){
                console.log('in cashe');
                return JSON.parse(await client.get(args.searchTerm));
            }

            const authors_ = await authorCollection();
            const matchedAuthors = await authors_.find({
                $or: [
                    {first_name: {$regex: args.searchTerm, $options: 'i'}},
                    {last_name: {$regex: args.searchTerm, $options: 'i'}}
                ]}).toArray();
            
            if(!matchedAuthors){
                throw new GraphQLError(`Internal Server Error`, {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            console.log('not in cashe');
            await client.setEx(args.searchTerm, 3600, JSON.stringify(matchedAuthors));
            
            return matchedAuthors;
        }
    },
    Book: {
        author: async (parentValue) => {
            const authors_ = await authorCollection();
            const author = await authors_.findOne({_id: parentValue.authorId});

            if(!author){
                throw new GraphQLError(`Internal Server Error - No Author Found`, {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            return author;
        }
    },
    Author: {
        numOfBooks: async (parentValue) => {
            const books_ = await bookCollection();
            const author = await books_.count({authorId: parentValue._id});

            // if(!author){
            //     throw new GraphQLError(`Internal Server Error`, {
            //         extensions: {code: 'INTERNAL_SERVER_ERROR'}
            //     });
            // }

            return author;
        },
        books: async (parentValue, args)=> {
            const books_ = await bookCollection();
            let matchedBooks = await books_.find({authorId: parentValue._id}).toArray();

            if(args.limit){
                if(typeof args.limit !== 'number' || isNaN(args.limit) || args.limit < 0 || !Number.isInteger(args.limit)){
                    throw new GraphQLError(`Invalid Number - Limit`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }

                if(args.limit <= matchedBooks.length){
                    return matchedBooks.slice(0, args.limit);
                }
            }
            return matchedBooks;
        }
    },
    Mutation: {
        addAuthor: async (_, args) => {

            if(typeof args.first_name !== 'string' || args.first_name.trim().length === 0 
                || typeof args.last_name !== 'string' || args.last_name.trim().length === 0
                    || typeof args.date_of_birth !== 'string' || args.date_of_birth.trim().length === 0
                        || typeof args.hometownCity !== 'string' || args.hometownCity.trim().length === 0
                            || typeof args.hometownState !== 'string' || args.hometownState.trim().length === 0){
                                throw new GraphQLError(`Invalid String - addAuthor`, {
                                    extensions: {code: 'BAD_USER_INPUT'}
                                });
            }

            //first_name + last_name
            args.first_name = args.first_name.trim();
            args.last_name = args.last_name.trim();

            if(args.first_name.length < 2 || args.last_name.length < 2 
                || args.first_name.search(/[0123456789]/g) != -1 || args.first_name.search(/[~`!@/#$%^&*><}?{()_+-=:;,."]/g) != -1
                || args.last_name.search(/[0123456789]/g) != -1 || args.last_name.search(/[~`!@/#$%^&*><}?{()_+-=:;,."]/g) != -1){
                    throw new GraphQLError(`Invalid First/Last Name`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
            }

            //date_of_birth
            args.date_of_birth = args.date_of_birth.trim();

            let dateArray = args.date_of_birth.split('/');
            if(dateArray.length != 3){
                throw new GraphQLError(`Invalid Date`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            let month = parseInt(dateArray[0]);
            let day = parseInt(dateArray[1]);
            let year = parseInt(dateArray[2]);
          
            if(isNaN(month) || isNaN(day) || isNaN(year)){
                throw new GraphQLError(`Invalid Number - Month/Day/Year`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
          
            if(month > 12 || month < 1){
                throw new GraphQLError(`Invalid Month`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
          
            if(
              month == 1 ||
              month == 3 ||
              month == 5 ||
              month == 7 ||
              month == 8 ||
              month == 10 ||
              month == 12
            ){
              if(day > 31 || day < 1){
                throw new GraphQLError(`Invalid Date`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
              }
            }
          
            if(
              month == 4 ||
              month == 6 ||
              month == 9 ||
              month == 11
            ){
              if(day > 30 || day < 1){
                throw new GraphQLError(`Invalid Date`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
              }
            }
          
            if(month == 2){
              if(day > 28 || day < 1){
                    throw new GraphQLError(`Invalid Date`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }
            }

            args.date_of_birth = `${month}/${day}/${year}`;

            //hometownCity
            args.hometownCity = args.hometownCity.trim();
            if(args.hometownCity.length < 2 || args.hometownCity.search(/[0123456789]/g) != -1 || args.hometownCity.search(/[~`!@/#$%^&*><}?{()_+-=:;,."]/g) != -1){
                throw new GraphQLError(`Invalid HometownCity`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            //homewtownState
            args.hometownState = args.hometownState.trim();
            args.hometownState = args.hometownState.toUpperCase();

            const states_ = [
                'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
                'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
                'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
                'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
                'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
            ];

            if(!states_.includes(args.hometownState)){
                throw new GraphQLError(`Invalid Hometown State`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            //collection

            const authors_ = await authorCollection();

            const new_author = {
                _id: uuid(),
                first_name: args.first_name,
                last_name: args.last_name,
                date_of_birth: args.date_of_birth,
                hometownCity: args.hometownCity,
                hometownState: args.hometownState,
                books: []
            }

            let insertedAuthor = await authors_.insertOne(new_author);
            if (!insertedAuthor.acknowledged || !insertedAuthor.insertedId) {
                throw new GraphQLError(`Could not add Author`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            new_author._id = insertedAuthor.insertedId;
            
            await client.set(new_author._id, JSON.stringify(new_author));
            console.log('cashed');

            return new_author;
        },
        editAuthor: async (_, args) => {
            if(!args._id || args._id.trim().length === 0 || typeof args._id !== 'string'){
                throw new GraphQLError(`Invalid String - ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            args._id = args._id.trim();

            if(!UUID.isValid(args._id)){
                throw new GraphQLError(`Invalid ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            const authors_ = await authorCollection();

            let updatedAuthor = await authors_.findOne({_id: args._id});

            if(updatedAuthor){

                if(args.first_name){

                    if(typeof args.first_name !== 'string' || args.first_name.trim().length === 0){
                        throw new GraphQLError(`Invalid String - First Name`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    args.first_name = args.first_name.trim();

                    if(args.first_name.length < 2 || args.first_name.search(/[0123456789]/g) != -1 || args.first_name.search(/[~`!@/#$%^&*><}?{()_+-=:;,."]/g) != -1){
                        throw new GraphQLError(`Invalid First Name`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedAuthor.first_name = args.first_name;
                }
                
                if(args.last_name){
                    if(typeof args.last_name !== 'string' || args.last_name.trim().length === 0){
                        throw new GraphQLError(`Invalid String - Last Name`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    args.last_name = args.last_name.trim();

                    if(args.last_name.length < 2 || args.last_name.search(/[0123456789]/g) != -1 || args.last_name.search(/[~`!@/#$%^&*><}?{()_+-=:;,."]/g) != -1){
                        throw new GraphQLError(`Invalid Last Name`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedAuthor.last_name = args.last_name;
                }

                if(args.date_of_birth){

                    if(typeof args.date_of_birth !== 'string' || args.date_of_birth.trim().length === 0){
                        throw new GraphQLError(`Invalid String - Date`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    args.date_of_birth = args.date_of_birth.trim();

                    let dateArray = args.date_of_birth.split('/');
                    
                    if(dateArray.length != 3){
                        throw new GraphQLError(`Invalid Date`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                    
                    let month = parseInt(dateArray[0]);
                    let day = parseInt(dateArray[1]);
                    let year = parseInt(dateArray[2]);
                
                    if(isNaN(month) || isNaN(day) || isNaN(year)){
                        throw new GraphQLError(`Invalid Number - Month/Day/Year`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                
                    if(month > 12 || month < 1){
                        throw new GraphQLError(`Invalid Month`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                
                    if(
                        month == 1 ||
                        month == 3 ||
                        month == 5 ||
                        month == 7 ||
                        month == 8 ||
                        month == 10 ||
                        month == 12
                    ){
                    
                        if(day > 31 || day < 1){
                            throw new GraphQLError(`Invalid Date`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                    }
                
                    if(
                        month == 4 ||
                        month == 6 ||
                        month == 9 ||
                        month == 11
                    ){
                        if(day > 30 || day < 1){
                            throw new GraphQLError(`Invalid Date`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                    }
                
                    if(month == 2){
                    
                        if(day > 28 || day < 1){
                            throw new GraphQLError(`Invalid Date`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                    }
                    
                    args.date_of_birth = `${month}/${day}/${year}`;

                    updatedAuthor.date_of_birth = args.date_of_birth;
                }

                if(args.hometownCity){
                    if(typeof args.hometownCity !== 'string' || args.hometownCity.trim().length === 0){
                        throw new GraphQLError(`Invalid String - Date`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                    args.hometownCity = args.hometownCity.trim();

                    if(args.hometownCity.length < 2 || args.hometownCity.search(/[0123456789]/g) != -1 || args.hometownCity.search(/[~`!@/#$%^&*><}?{()_+-=:;,."]/g) != -1){
                        throw new GraphQLError(`Invalid HometownCity`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedAuthor.hometownCity = args.hometownCity;
                }

                if(args.hometownState){
                    if(typeof args.hometownState !== 'string' || args.hometownState.trim().length === 0){
                        throw new GraphQLError(`Invalid String - HometownState`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    args.hometownState = args.hometownState.trim();

                    args.hometownState = args.hometownState.toUpperCase();

                    const states_ = [
                        'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
                        'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
                        'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
                        'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
                        'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
                    ];

                    if(!states_.includes(args.hometownState)){
                        throw new GraphQLError(`Invalid US State`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedAuthor.hometownState = args.hometownState;
                }

                const update_ = await authors_.updateOne({_id: args._id}, {$set: updatedAuthor});
                
                if (update_.motifiedCount === 0) {
                    throw new GraphQLError(`Could not edit Author`, {
                      extensions: {code: 'INTERNAL_SERVER_ERROR'}
                    });
                }

                const exists = await client.exists(args._id);
                if(exists){
                    await client.del(args._id);
                    console.log('in cashe -> deleted cashe');
                }

                console.log('freshly cashed - edited author');
                await client.set(args._id, JSON.stringify(updatedAuthor));

            } else{
                throw new GraphQLError(`Could not found author with id of ${args._id}`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            return updatedAuthor;

        },
        removeAuthor: async (_, args) => {
            if(!args._id || args._id.trim().length === 0 || typeof args._id !== 'string'){
                throw new GraphQLError(`Invalid String - ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            args._id = args._id.trim();

            if(!UUID.isValid(args._id)){
                throw new GraphQLError(`Invalid ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            const books_ = await bookCollection();
            const authors_ = await authorCollection();

            const deletedAuthor = await authors_.findOneAndDelete({_id: args._id})
            if (!deletedAuthor) {
                throw new GraphQLError(`Could not delete author`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }
            
            const deleteBooks = await books_.deleteMany({authorId: deletedAuthor._id});
            
            if (deleteBooks.deletedCount === 0) {
                throw new GraphQLError(`Could not remove books from author`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            for(let x = 0; x < deletedAuthor.books.length; x++){
                await client.del(deletedAuthor.books[x]);
            }

            console.log('deleted cached books ...')

            console.log('deleting cashed author')
            await client.del(deletedAuthor._id);

            return deletedAuthor;
        },
        addBook: async (_, args) => {
            if(typeof args.title !== 'string' || args.title.trim().length === 0 ||
                typeof args.publicationDate !== 'string' || args.publicationDate.trim().length === 0 ||
                    typeof args.publisher !== 'string' || args.publisher.trim().length === 0 ||
                        typeof args.summary !== 'string' || args.summary.trim().length === 0 ||
                            typeof args.isbn !== 'string' || args.isbn.trim().length === 0 || 
                                typeof args.language !== 'string' || args.language.trim().length === 0 ||
                                    typeof args.authorId !== 'string' || args.authorId.trim().length === 0){
                                        throw new GraphQLError(`Invalid String - addBook string inputs`, {
                                            extensions: {code: 'BAD_USER_INPUT'}
                                        });
            }

            // title
            args.title = args.title.trim();

            if(args.title.length < 2 || args.title.search(/[@#$%^&*><}{_/+=\-"]/g) !== -1){
                throw new GraphQLError(`Invalid Title`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            // publicationDate
            args.publicationDate = args.publicationDate.trim();

            let dateArray = args.publicationDate.split('/');
            if(dateArray.length != 3){
                throw new GraphQLError(`Invalid Date`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            let month = parseInt(dateArray[0]);
            let day = parseInt(dateArray[1]);
            let year = parseInt(dateArray[2]);
          
            if(isNaN(month) || isNaN(day) || isNaN(year)){
                throw new GraphQLError(`Invalid Number - Month/Day/Year`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
          
            if(month > 12 || month < 1){
                throw new GraphQLError(`Invalid Month`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
          
            if(
              month == 1 ||
              month == 3 ||
              month == 5 ||
              month == 7 ||
              month == 8 ||
              month == 10 ||
              month == 12
            ){
              if(day > 31 || day < 1){
                throw new GraphQLError(`Invalid Date`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
              }
            }
          
            if(
              month == 4 ||
              month == 6 ||
              month == 9 ||
              month == 11
            ){
              if(day > 30 || day < 1){
                throw new GraphQLError(`Invalid Date`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
              }
            }
          
            if(month == 2){
              if(day > 28 || day < 1){
                    throw new GraphQLError(`Invalid Date`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }
            }

            args.publicationDate = `${month}/${day}/${year}`;

            // publisher
            args.publisher = args.publisher.trim();
            if(args.publisher.length < 2 || args.publisher.search(/[0123456789]/g) != -1 || args.publisher.search(/[~`!@/#$%^&*><}?{()_+-=:;,"]/g) != -1){
                    throw new GraphQLError(`Invalid Publisher`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
            }

            // summary
            args.summary = args.summary.trim();
            if(args.summary.length < 2 || args.summary.search(/[~@/#$%^&*><}{()_+=]/g) != -1){
                    throw new GraphQLError(`Invalid Summary`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
            }

            // isbn
            args.isbn = args.isbn.trim();
            const isbn_tester = /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/;
            if(isbn_tester.test(args.isbn)){
                throw new GraphQLError(`Invalid ISBN`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            // language
            args.language = args.language.trim();
            if(args.language.length < 4 || args.language.search(/[~`!@/#$%^&*><}?{()_+-=:.;,"]/g) != -1){
                throw new GraphQLError(`Invalid Language`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }


            // authorId
            args.authorId = args.authorId.trim();
            if(!UUID.isValid(args.authorId)){
                throw new GraphQLError(`Invalid ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            //genres
            for(let x = 0; x < args.genres.length; x++){
                if(args.genres[x].trim().length == 0 || typeof args.genres[x] !== 'string'){
                    throw new GraphQLError(`Invalid String - Genre`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }
                if(args.genres[x].length < 3 || args.genres[x].search(/[0123456789]/g) != -1 || args.genres[x].search(/[~`!@#$/%^&*-<}?{()_+-=:;,.'"]/g) != -1){
                    throw new GraphQLError(`Invalid Genre`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }
                args.genres[x] = args.genres[x].trim();
            }

            //pageCount
            if(!Number.isInteger(args.pageCount) || args.pageCount <= 0 || typeof args.pageCount !== 'number'){
                throw new GraphQLError(`Invalid Page Count`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            //price
            if(args.price < 0 || typeof args.price !== 'number'){
                throw new GraphQLError(`Invalid Price`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            if(!Number.isInteger(args.price)){
                let converted = args.price.toString();
                converted = converted.split('.')[1];
                if(converted.length > 2){
                    throw new GraphQLError(`Invalid Price`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }
            }

            //format
            const formats_ = ["Hardcover", "E-Book", "Paperback"];
            for(let x = 0; x < args.format.length; x++){
                if(args.format[x].trim().length == 0 || typeof args.format[x] !== 'string'){
                    throw new GraphQLError(`Invalid Format`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }

                args.format[x] = args.format[x].trim().toLowerCase();
                const index = formats_.findIndex( element => {
                    return element.toLowerCase() === args.format[x];
                })

                if(index === -1){
                    throw new GraphQLError(`Invalid Format _ index`, {
                        extensions: {code: 'BAD_USER_INPUT'}
                    });
                }

                args.format[x] = formats_[index];
            }

            // collections
            const books_ = await bookCollection();
            const authors_ = await authorCollection();

            let author = await authors_.findOne({_id: args.authorId})
            
            if(!author){
                throw new GraphQLError(`Could not found author with id of ${args.authorId}`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            const new_book = {
                _id: uuid(),
                title: args.title,
                genres: args.genres,
                publicationDate: args.publicationDate,
                publisher: args.publisher,
                summary: args.summary,
                isbn: args.isbn,
                language: args.language,
                pageCount: args.pageCount,
                price: args.price,
                format: args.format,
                authorId: args.authorId
            }

            let insertedBook = await books_.insertOne(new_book);
            if (!insertedBook.acknowledged || !insertedBook.insertedId) {
                throw new GraphQLError(`Could not Add Book`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }
            
            new_book._id = insertedBook.insertedId;

            // cashe new book
            console.log('adding new book to cashe');
            await client.set(new_book._id, JSON.stringify(new_book));


            let updatedBook = await authors_.updateOne({_id: args.authorId}, {$push: {books: insertedBook.insertedId}});
            if (updatedBook.motifiedCount === 0) {
                throw new GraphQLError(`Could not Add Book to Author`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }
            
            let update_author = await authors_.findOne({_id: args.authorId});
            if (!update_author) {
                throw new GraphQLError(`Internal Server Error`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            console.log('updating author cashe');
            const exists = await client.exists(args.authorId);
            if(!exists){
                throw new GraphQLError(`Internal Server Error - Invalid AuthorId`, {
                    extensions: {code: 'INTERNAL_SERVER_ERROR'}
                  });
            }

            await client.del(args.authorId);
            await client.set(args.authorId, JSON.stringify(update_author));

            return new_book;
        },
        editBook: async (_, args) => {
            if(!args._id || args._id.trim().length === 0){
                throw new GraphQLError(`Bad User Input`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            args._id = args._id.trim();

            if(!UUID.isValid(args._id)){
                throw new GraphQLError(`Invalid ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            const books_ = await bookCollection();

            let updatedBook = await books_.findOne({_id: args._id});

            if(updatedBook){
                if(args.title){
                    if(typeof args.title !== 'string' || args.title.trim().length === 0){
                        throw new GraphQLError(`Invalid Title`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    args.title = args.title.trim();
                    
                    if(args.title.length < 2 || args.title.search(/[@#$%^&*><}{_/+=\-"]/g) !== -1){
                        throw new GraphQLError(`Invalid Title`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedBook.title = args.title;
                }

                if(args.genres){
                    for(let x = 0; x < args.genres.length; x++){
                        if(args.genres[x].trim().length == 0 || typeof args.genres[x] !== 'string'){
                            throw new GraphQLError(`Invalid Genre String`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                        if(args.genres[x].length < 3 || args.genres[x].search(/[0123456789]/g) != -1 || args.genres[x].search(/[~`!@#$/%^&*-<}?{()_+-=:;,.'"]/g) != -1){
                            throw new GraphQLError(`Invalid Genre`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                        args.genres[x] = args.genres[x].trim();
                    }

                    updatedBook.genres = args.genres;
                }

                if(args.publicationDate){
                    
                    if(typeof args.publicationDate !== 'string' || args.publicationDate.trim().length === 0){
                        throw new GraphQLError(`Invalid Title`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                    
                    args.publicationDate = args.publicationDate.trim();

                    let dateArray = args.publicationDate.split('/');
                    if(dateArray.length != 3){
                        throw new GraphQLError(`Invalid Date`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                    
                    let month = parseInt(dateArray[0]);
                    let day = parseInt(dateArray[1]);
                    let year = parseInt(dateArray[2]);
                  
                    if(isNaN(month) || isNaN(day) || isNaN(year)){
                        throw new GraphQLError(`Invalid Month`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                  
                    if(month > 12 || month < 1){
                        throw new GraphQLError(`Invalid Month`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                  
                    if(
                      month == 1 ||
                      month == 3 ||
                      month == 5 ||
                      month == 7 ||
                      month == 8 ||
                      month == 10 ||
                      month == 12
                    ){
                      if(day > 31 || day < 1){
                        throw new GraphQLError(`Invalid Date`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                      }
                    }
                  
                    if(
                      month == 4 ||
                      month == 6 ||
                      month == 9 ||
                      month == 11
                    ){
                      if(day > 30 || day < 1){
                        throw new GraphQLError(`Invalid Date`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                      }
                    }
                  
                    if(month == 2){
                      if(day > 28 || day < 1){
                            throw new GraphQLError(`Invalid Date`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                    }

                    args.publicationDate = `${month}/${day}/${year}`;

                    updatedBook.publicationDate = args.publicationDate;

                }

                if(args.publisher){
                    if(typeof args.publisher !== 'string' || args.publisher.trim().length === 0){
                        throw new GraphQLError(`Invalid Title`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    args.publisher = args.publisher.trim();
                    
                    if(args.publisher.length < 2 || args.publisher.search(/[0123456789]/g) != -1 || args.publisher.search(/[~`!@/#$%^&*><}?{()_+-=:;,"]/g) != -1){
                        throw new GraphQLError(`Invalid Publisher`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedBook.publisher = args.publisher;
                }

                if(args.summary){
                    if(typeof args.summary !== 'string' || args.summary.trim().length === 0){
                        throw new GraphQLError(`Invalid Title`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                    
                    args.summary = args.summary.trim();
                    
                    if(args.summary.length < 2 || args.summary.search(/[~@/#$%^&*><}{()_+=]/g) != -1){
                            throw new GraphQLError(`Invalid Summary`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                    }

                    updatedBook.summary = args.summary;
                }

                if(args.isbn){
                    if(typeof args.isbn !== 'string' || args.isbn.trim().length === 0){
                        throw new GraphQLError(`Invalid Title`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    args.isbn = args.isbn.trim();
                    
                    const isbn_tester = /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/;
                    
                    if(isbn_tester.test(args.isbn)){
                        throw new GraphQLError(`Invalid ISBN`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedBook.isbn = args.isbn;
                }

                if(args.language){
                    if(typeof args.language !== 'string' || args.language.trim().length === 0){
                        throw new GraphQLError(`Invalid Title`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                    
                    args.language = args.language.trim();
                    
                    if(args.language.length < 4){
                        throw new GraphQLError(`Invalid Language Length`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedBook.language = args.language;
                }

                if(args.pageCount){
                    if(!Number.isInteger(args.pageCount) || args.pageCount <= 0 || typeof args.pageCount !== 'number'){
                        throw new GraphQLError(`Invalid Page Count`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    updatedBook.pageCount = args.pageCount;
                }

                if(args.price){
                    if(args.price < 0 || typeof args.price !== 'number'){
                        throw new GraphQLError(`Invalid Price`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
        
                    if(!Number.isInteger(args.price)){
                        let converted = args.price.toString();
                        converted = converted.split('.')[1];
                        if(converted.length > 2){
                            throw new GraphQLError(`Invalid Price`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                    }
                }

                if(args.format){
                    const formats_ = ["Hardcover", "E-Book", "Paperback"];
                    for(let x = 0; x < args.format.length; x++){
                        if(args.format[x].trim().length == 0 || typeof args.format[x] !== 'string'){
                            throw new GraphQLError(`Invalid String - Format`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
                        args.format[x] = args.format[x].trim().toLowerCase();
                        const index = formats_.findIndex( element => {
                            return element.toLowerCase() === args.format[x];
                        })
        
                        if(index === -1){
                            throw new GraphQLError(`Invalid Format _ index`, {
                                extensions: {code: 'BAD_USER_INPUT'}
                            });
                        }
        
                        args.format[x] = formats_[index];
                    }

                    updatedBook.format = args.format;
                }

                if(args.authorId){
                    if(!args.authorId || args.authorId.trim().length === 0 || typeof args.authorId !== 'string'){
                        throw new GraphQLError(`Invalid String - ID`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }
                    
                    args.authorId = args.authorId.trim();
        
                    if(!UUID.isValid(args.authorId)){
                        throw new GraphQLError(`Invalid ID`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    const authors_ = await authorCollection();
                    
                    //If the authorId is updated, then you need to check whether the new authorId is a valid authorId before 
                    //editing the Book (meaning they exist in the DB).  If the author of the book changes, 
                    //then you MUST remove that book ID from the old author's array of book ID's AND 
                    //you must push the book ID into the array of books for the new author.

                    let new_author = await authors_.findOne({_id: args.authorId});
                    
                    if (!new_author) {
                        throw new GraphQLError(`Could not found new author with id of ${args.authorId}`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    let update_new = await authors_.updateOne({_id: new_author._id}, {$push: {books: updatedBook._id}});
                    
                    if (update_new.motifiedCount === 0) {
                        throw new GraphQLError(`Could not add Book to new Author`, {
                        extensions: {code: 'INTERNAL_SERVER_ERROR'}
                        });
                    }

                    let _newAuthor = await authors_.findOne({_id: new_author._id});

                    let exists = await client.exists(new_author._id);
                    if(!exists){
                        throw new GraphQLError(`Could not update new author cashe`, {
                            extensions: {code: 'INTERNAL_SERVER_ERROR'}
                            });
                    }

                    console.log('updating new_author cashe');
                    await client.del(new_author._id);
                    await client.set(new_author._id, JSON.stringify(_newAuthor));
                    

                    let old_author = await authors_.findOne({_id: updatedBook.authorId});
                    
                    if (!old_author) {
                        throw new GraphQLError(`Could not found old author with id of ${updatedBook.authorId}`, {
                            extensions: {code: 'BAD_USER_INPUT'}
                        });
                    }

                    let remove_old = await authors_.updateOne({_id: old_author._id}, {$pull: {books: updatedBook._id}});
                    
                    if (remove_old.motifiedCount === 0) {
                        throw new GraphQLError(`Could not edit old author`, {
                          extensions: {code: 'INTERNAL_SERVER_ERROR'}
                        });
                    }

                    let _oldAuthor = await authors_.findOne({_id: old_author._id});

                    exists = await client.exists(old_author._id);
                    if(!exists){
                        throw new GraphQLError(`Could not edit cashe old Author`, {
                            extensions: {code: 'INTERNAL_SERVER_ERROR'}
                            });
                    }

                    console.log('updating old_author cashe');
                    await client.del(old_author._id);
                    await client.set(old_author._id, JSON.stringify(_oldAuthor));

                    updatedBook.authorId = args.authorId;
                }

                const update_ = await books_.updateOne({_id: args._id}, {$set: updatedBook});
                
                if (update_.motifiedCount === 0) {
                    throw new GraphQLError(`Could not edit book`, {
                      extensions: {code: 'INTERNAL_SERVER_ERROR'}
                    });
                }

                const exists = await client.exists(args._id);
                if(exists){
                    await client.del(args._id);
                    console.log('in cashe -> deleted cashe');
                }

                console.log('freshly cashed - edited book');
                await client.set(args._id, JSON.stringify(updatedBook));

            } else {
                throw new GraphQLError(`Could not found book with id of ${args._id}`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            return updatedBook;
        },
        removeBook: async (_, args) => {
            
            if(!args._id || args._id.trim().length === 0 || typeof args._id !== 'string'){
                throw new GraphQLError(`Bad User Input`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }
            
            args._id = args._id.trim();

            if(!UUID.isValid(args._id)){
                throw new GraphQLError(`Invalid ID`, {
                    extensions: {code: 'BAD_USER_INPUT'}
                });
            }

            const books_ = await bookCollection();
            const deletedBook = await books_.findOneAndDelete({_id: args._id})
            if (!deletedBook) {
                throw new GraphQLError(`Could not delete book`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }

            console.log('deleting book in cashe');
            await client.del(deletedBook._id);

            const authors_ = await authorCollection();
            const authorBook = await authors_.updateOne({_id: deletedBook.authorId}, {$pull: {books: deletedBook._id}});
            if (authorBook.motifiedCount === 0) {
                throw new GraphQLError(`Could not remove book from author`, {
                  extensions: {code: 'INTERNAL_SERVER_ERROR'}
                });
            }
            const _delBook = await authors_.findOne({_id: deletedBook.authorId});
            console.log('removing/updating book from cashed author');

            await client.del(deletedBook.authorId);
            await client.set(deletedBook.authorId, JSON.stringify(_delBook));

            return deletedBook;
        },
    }
}