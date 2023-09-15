const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;

async function createUser(){

}

async function checkUser(){

}

module.exports = {
    createUser,
    checkUser
}