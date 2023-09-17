// testing data functions for now

const recipes = require('./data/recipes');
const users = require('./data/users');
const reviews = require('./data/reviews');

const connection = require('./config/mongoConnection');

async function main(){
    const db = await connection.dbConnection();
    await db.dropDatabase();

    // code testing ...
    let recipe;
    let user_def = {_id:"51294dadd90ffc066cd03bff", username: "ZeroCool"};

    try{
        // const user1 = await users.createUser("Francesca    Severino", "fseve1ino", "Peewee1050@");
        // console.log(user1);

        // const res1 = await recipes.createRecipe(
        //     "Spaghetti Carbonara",
        //     ["Spaghetti", "Eggs", "Pecorino cheese", "Guanciale", "Black pepper", "Salt"],
        //     "intermediate",
        //     [
        //         "Boil spaghetti in salted water until al dente.",
        //         "While pasta is cooking, fry guanciale until crispy.",
        //         "In a bowl, mix eggs, grated Pecorino cheese, and black pepper.",
        //         "Drain cooked pasta and add it to the pan with guanciale. Mix well.",
        //         "Remove from heat and quickly mix in the egg and cheese mixture.",
        //     "Serve immediately with additional Pecorino cheese and black pepper."
        //     ],
        //     user1
        // )
        // console.log(res1);
        // const test1 =   {
        //     title: "Chicken Alfredo",
        //     ingredients: ["Chicken breasts", "Fettuccine pasta", "Heavy cream", "Butter", "Parmesan cheese", "Garlic", "Salt", "Black pepper"],
        //     // skillLevel: "advanced",
        //     // steps: [
        //     //   "Season chicken breasts with salt and black pepper, then grill until cooked through. Slice into strips.",
        //     //   "Cook fettuccine pasta according to package instructions. Drain and set aside.",
        //     //   "In a saucepan, melt butter and sauté minced garlic until fragrant.",
        //     //   "Pour in heavy cream and bring to a simmer. Stir in grated Parmesan cheese until the sauce thickens.",
        //     //   "Add the cooked pasta and sliced chicken to the sauce. Toss to coat everything evenly.",
        //     //   "Serve hot with additional Parmesan cheese and black pepper."
        //     // ]
        //   }
        // const res2 = await recipes.updateRecipe(
        //     res1._id,
        //     test1
        // )
        // console.log(res2);

        // const res3 = await recipes.createRecipe(
        //     "Chicken Alfredo",
        //     ["Chicken breasts", "Fettuccine pasta", "Heavy cream", "Butter", "Parmesan cheese", "Garlic", "Salt", "Black pepper"],
        //     "advanced",
        //     ["Season chicken breasts with salt and black pepper, then grill until cooked through. Slice into strips.",
        //     "Cook fettuccine pasta according to package instructions. Drain and set aside.",
        //     "In a saucepan, melt butter and sauté minced garlic until fragrant.",
        //     "Pour in heavy cream and bring to a simmer. Stir in grated Parmesan cheese until the sauce thickens.",
        //     "Add the cooked pasta and sliced chicken to the sauce. Toss to coat everything evenly.",
        //     "Serve hot with additional Parmesan cheese and black pepper."],
        //     user1
        // );
        // console.log(res3);

        // const all = await recipes.getAllRecipes(0, 50);
        // console.log(all);
        
        // const rev1 = await reviews.createReview(
        //     res3._id,
        //     user1,
        //     4,
        //     "great recipe, but it was hard to make ngl"
        // )
        // console.log(res3);

        // const del = await reviews.deleteReview(
        //     user1,
        //     res3._id,
        //     rev1
        // )
        
        // console.log(del);
 
    } catch(e){
        console.log(e);
    }

    // try{
    //     const find = await users.checkUser("fseverino", "Peewee1050@");
    //     console.log(find);
    // } catch(e){
    //     console.log(e);
    // }

    try{

    } catch(e){
        console.log(e);
    }

    // try{

    // } catch(e){
    //     console.log(e);
    // }

    // try{

    // } catch(e){
    //     console.log(e);
    // }

    // try{

    // } catch(e){
    //     console.log(e);
    // }

    // try{

    // } catch(e){
    //     console.log(e);
    // }

    // try{

    // } catch(e){
    //     console.log(e);
    // }


    // {
    //     "title": "Spaghetti Carbonara",
    //     "ingredients": ["Spaghetti", "Eggs", "Pecorino cheese", "Guanciale", "Black pepper", "Salt"],
    //     "skillLevel": "intermediate",
    //     "steps": [
    //     "Boil spaghetti in salted water until al dente.",
    //     "While pasta is cooking, fry guanciale until crispy.",
    //     "In a bowl, mix eggs, grated Pecorino cheese, and black pepper.",
    //     "Drain cooked pasta and add it to the pan with guanciale. Mix well.",
    //     "Remove from heat and quickly mix in the egg and cheese mixture.",
    //     "Serve immediately with additional Pecorino cheese and black pepper."
    //     ]
    // }

    // {
    //     "title": "Chicken Alfredo",
    //     "ingredients": ["Chicken breasts", "Fettuccine pasta", "Heavy cream", "Butter", "Parmesan cheese", "Garlic", "Salt", "Black pepper"],
    //     "skillLevel": "advanced",
    //     "steps": [
    //     "Season chicken breasts with salt and black pepper, then grill until cooked through. Slice into strips.",
    //     "Cook fettuccine pasta according to package instructions. Drain and set aside.",
    //     "In a saucepan, melt butter and sauté minced garlic until fragrant.",
    //     "Pour in heavy cream and bring to a simmer. Stir in grated Parmesan cheese until the sauce thickens.",
    //     "Add the cooked pasta and sliced chicken to the sauce. Toss to coat everything evenly.",
    //     "Serve hot with additional Parmesan cheese and black pepper."
    //     ]
    // }


    // {
    //     "title": "Scrambled Eggs",
    //     "ingredients": ["Eggs", "Butter", "Salt", "Black pepper"],
    //     "skillLevel": "novice",
    //     "steps": [
    //     "Crack eggs into a bowl, add a pinch of salt and black pepper, and whisk until well beaten.",
    //     "Heat a non-stick skillet over low heat and add butter.",
    //     "Pour the beaten eggs into the skillet and cook, stirring gently, until they are just set but still slightly creamy.",
    //     "Remove from heat immediately and serve."
    //     ]
    // }
    
      
    await connection.closeConnection();
    console.log('Done!');
}

main();