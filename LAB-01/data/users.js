const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;
const{ ObjectId } = require('mongodb');

async function createUser(
    name,
    username,
    password
){
    if(arguments.length !== 3){throw "Error: Must provide three agruments."}

    if(!name){throw "Error: Must provide a name."}
    if(!username){throw "Error: Must provide a username."}
    if(!password){throw "Error: Must provide a password."}

    if(typeof name !== 'string' || name.trim().length === 0){throw "Error: Must provide a valid string name."}
    if(typeof username !== 'string'|| username.trim().length === 0){throw "Error: Must provide a valid string username."}
    if(typeof password !== 'string'|| password.trim().length === 0){throw "Error: Must provide a valid string password."}
  

    if(username.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1 || username.search(" ") !== -1 || username.length < 5){throw "Error: Must provide a username with only alphanumeric characters and at least 5 characters long"}
    if(password.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) === -1 || password.search(/[0123456789]/g) === -1 || password.search(/[A-Z][a-z]/) === -1 || password.search(" ") !== -1 || password.length < 8){throw "Error: Must provide a password with at least one number, one uppercase letter, one lowercase letter, and one special character"}
    
    // name formatted
    name = name.trim();
    let nameArray = name.split(" ").filter(elm => elm);
    if(nameArray.length !== 2){throw "Error: Must only include First and Last name."}

    for(let x = 0; x < nameArray.length; x++){
        if(nameArray[x].length < 3 || nameArray[x].search(/[0123456789]/g) != -1 || nameArray[x].search(/[~`!@/#$%^&*><}?{()_+-=:;,."]/g) != -1){throw "Error: User's first and last name must be at least 3 characters long with no punctation and numbers"}
        nameArray[x] = nameArray[x].trim();
    }
    name = nameArray.join(' ');

    // user check
    const userCollection = await user();
    const user_status = await userCollection.findOne({
        username: username.toLowerCase()
    });
    if(user_status){throw "Error: Username already taken."}

    // hash password
    const hashed = await bcrypt.hash(password, saltRounds);

    let newUser = {
        name: name,
        username: username.toLowerCase(),
        password: hashed
    };

    const insertedUser = await userCollection.insertOne(newUser);
    if(insertedUser.insertedCount === 0 || !insertedUser.acknowledged){throw "Error: Could not add user"}

    // return {insertedUser: true}
    const userId = insertedUser.insertedId.toString();
    return await getUserById(userId);
}

async function checkUser(
    username,
    password
){
    if(arguments.length !== 2){throw "Error: Must provide three agruments."}

    if(!username){throw "Error: Must provide a username."}
    if(!password){throw "Error: Must provide a password."}

    if(typeof username != 'string'|| username.trim().length == 0){throw "Error: Must provide a username"}
    if(typeof password != 'string'|| password.trim().length == 0){throw "Error: Must provide a password"}
  
    if(username.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1 || username.search(" ") !== -1 || username.length < 5){throw "Error: Must provide a username with only alphanumeric characters and at least 5 characters long"}
    if(password.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) === -1 || password.search(/[0123456789]/g) === -1 || password.search(/[A-Z][a-z]/) === -1 || password.search(" ") !== -1 || password.length < 8){throw "Error: Must provide a password with at least one number, one uppercase letter, one lowercase letter, and one special character"}
    
    // username check
    const userCollection = await user();
    const user_username = await userCollection.findOne({
      username: username.toLowerCase(),
    })
    if(!user_username){throw "Either the username or password is invalid"}
  
    // password check
    const user_match = await bcrypt.compare(password, user_username.password);
    if(!user_match){throw "Either the username or password is invalid"}

    user_username._id = user_username._id.toString();

    return user_username;
}

async function getUserById(
    id
){
    if(arguments.length !== 1){throw "Error: Must provide one argument."}

    if(!id){throw "Error: Must provide a valid id"}
    if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
    id = id.trim();

    if(!ObjectId.isValid(id)){throw "Error: Invalid object id."}

    const userCollection = await user();
    
    const user1 = await userCollection.findOne({_id: new ObjectId(id)}, {projection: {_id:1, username:1}});
    if(user1 === null){throw "Error: No user with that id"}

    user1._id = user1._id.toString();
    return user1;
}

module.exports = {
    createUser,
    checkUser
}