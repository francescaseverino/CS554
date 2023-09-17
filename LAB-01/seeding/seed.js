const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const recipes = data.recipes;
const users = data.users;

async function main() {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();


    // code data ...

    
    await dbConnection.closeConnection();
    console.log('Done!');
}

main();