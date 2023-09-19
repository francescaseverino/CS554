const mongoCollections = require('../config/mongoCollections');
const recipes = mongoCollections.recipes;
const{ ObjectId } = require('mongodb');

async function createRecipe(
    title,
    ingredients,
    skillLevel,
    steps,
    user
){
    if(arguments.length !== 5){throw "Error: Must provide 5 arguments."}
    
    if(!title){throw "Error: Must provide a title."}
    if(!ingredients){throw "Error: Must provide at least 4 ingredients."}
    if(!skillLevel){throw "Error: Must choose a skill level."}
    if(!steps){throw "Error: Must provide at least 5 steps."}
    if(!user){throw "Error: Must be a logged in user."}
    
    if(typeof title !== 'string' || title.trim().length === 0) {throw "Error: Title must be a valid string."}
    if(!Array.isArray(ingredients) || ingredients.length < 4) {throw "Error: List of ingredients must be an array of at least 4 elements."}
    if(typeof skillLevel !== 'string' || skillLevel.trim().length === 0){throw "Error: SkillLevel must be a valid string."}
    if(!Array.isArray(steps) || steps.length < 5){throw "Error: List of steps must be an array of at least 5 elements."}
    if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be a valid user object."}

    // title
    if(title.length < 5 || title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Title must be at least 5 characters w/ no punctation"}
    title = title.trim();

    // ingredients
    for(let x = 0; x < ingredients.length; x++){
        if(typeof ingredients[x] !== 'string' || ingredients[x].trim().length === 0){throw "Error: Must have valid string elements for ingredients"}
        ingredients[x] = ingredients[x].trim();
        if(ingredients[x].length < 4 || ingredients[x].length > 50 || ingredients[x].search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Must have an ingredient of at least 4 characters and max of 50. No punctations"}
    }

    // skillLevel
    let skillset = ["Novice", "Intermediate", "Advanced"];
    skillLevel = skillLevel.trim().toLowerCase();
    
    let choice = skillset.findIndex(skill => skill.toLowerCase() === skillLevel.toLowerCase());
    if(choice === -1){throw "Error: Must choose one of the following skill levels: Novice, Intermediate, Advanced"}
    skillLevel = skillset[choice];

    // steps
    for(let x = 0; x < steps.length; x++){
        if(typeof steps[x] !== 'string' || steps[x].trim().length === 0){throw "Error: Must have valid string elements for steps."}
        steps[x] = steps[x].trim();
        if(steps[x].length < 20 || steps[x].search(/[!@#$%^&*><}?{()_/+=\-"]/g) !== -1){throw "Error: Must have an ingredient of at least 20 characters. No special characters."}
    }

    //user
    if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}


    // mongodb
    const recipeCollection = await recipes();

    let newRecipe = {
        title: title,
        ingredients: ingredients,
        skillLevel: skillLevel,
        steps: steps,
        user: user,
        reviews: [],
        likes: []
    };

    let insertInfo = await recipeCollection.insertOne(newRecipe);

    if(insertInfo.insertedCount === 0 || !insertInfo.acknowledged){throw "Error: Could not add recipe."}

    const recipe = await getRecipeById(insertInfo.insertedId.toString());
    return recipe;
}

async function getAllRecipes(
    start,
    end
){
    if(arguments.length != 2){throw "Error: Must provide two arguments."}

    if(typeof start !== 'number' || start < 0 || isNaN(start)){throw "Error: Start must be a positive number."}
    if(typeof end !== 'number' || end < 0 || isNaN(end)){throw "Error: End must be a positive number."}
    if(!Number.isInteger(start) || !Number.isInteger(end)){throw "Error: Must provide integers only."}
    
    // mongodb
    const recipeCollection = await recipes();

    if(!((end - start) === 50)){throw "Error: Display of 50 recipes at a time."}

    const recipes_list = await recipeCollection.find().skip(start).limit(end).toArray();

    if(!recipes_list.length === 0){
        for(let x = 0; x < recipes_list.length; x++){
            recipes_list[x] = await getRecipeById(recipes_list[x]._id.toString());
        }
    }
    return recipes_list;
}

async function getRecipeById(
    id
){
    if(arguments.length !== 1){throw "Error: Must provide one argument."}

    if(!id){throw "Error: Must provide a valid id"}
    if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
    id = id.trim();

    if(!ObjectId.isValid(id)){throw "Error: Invalid object id."}

    const recipeCollection = await recipes();
    
    let recipe = await recipeCollection.findOne({_id: new ObjectId(id)});
    if(recipe === null){throw "Error: No recipe with that id"}

    recipe._id = recipe._id.toString();
    
    if(!(recipe.reviews.length === 0)){
        for(let x = 0; x < recipe.reviews.length; x++){
            recipe.reviews[x]._id = recipe.reviews[x]._id.toString();
        }
    }

    return recipe;
}

async function updateRecipe(
    id,
    updatedRecipe,
    user
){
    // cannot motify reviews/like/user
    if(arguments.length !== 3){throw "Error: Must provide three arguments."}

    // id
    if(!id){throw "Error: Must provide a valid id"}
    if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
    id = id.trim();

    if(!ObjectId.isValid(id)){throw "Error: Invalid object id."}

    // user
    if(!user){throw "Error: Must be a logged in user."}
    if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be a valid user object."}
    if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}
    
    // update recipe
    if(!updatedRecipe){throw "Error: Must provide an updated object recipe."}
    if(typeof updatedRecipe !== 'object' || Array.isArray(updatedRecipe)){throw "Error: Must be a valid object."}

    let resObject = {};
    
    if(updatedRecipe.reviews || updatedRecipe.likes || updatedRecipe.user){throw "Error: Cannot modify these fields ... reviews, likes, user."}
    if(!updatedRecipe.title && !updatedRecipe.ingredients && !updatedRecipe.skillLevel && !updatedRecipe.steps){throw "Error: Must request at least one field."}

    // if title 
    if(updatedRecipe.title){
        if(typeof updatedRecipe.title !== 'string' || updatedRecipe.title.trim().length === 0) {throw "Error: Title must be a valid string."}
        if(updatedRecipe.title.length < 5 || updatedRecipe.title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Title must be at least 5 characters w/ no punctation"}
        updatedRecipe.title = updatedRecipe.title.trim();
        resObject.title = updatedRecipe.title;
    }

    // if ingredients
    if(updatedRecipe.ingredients){
        if(!Array.isArray(updatedRecipe.ingredients) || updatedRecipe.ingredients.length < 4) {throw "Error: List of ingredients must be an array of at least 4 elements."}
        for(let x = 0; x < updatedRecipe.ingredients.length; x++){
            if(typeof updatedRecipe.ingredients[x] !== 'string' || updatedRecipe.ingredients[x].trim().length === 0){throw "Error: Must have valid string elements for ingredients"}
            updatedRecipe.ingredients[x] = updatedRecipe.ingredients[x].trim();
            if(updatedRecipe.ingredients[x].length < 4 || updatedRecipe.ingredients[x].length > 50 || updatedRecipe.ingredients[x].search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Must have an ingredient of at least 4 characters and max of 50. No punctations"}
        }
        resObject.ingredients = updatedRecipe.ingredients;
    }

    // if skill level
    if(updatedRecipe.skillLevel){
        if(typeof updatedRecipe.skillLevel !== 'string' || updatedRecipe.skillLevel.trim().length === 0){throw "Error: SkillLevel must be a valid string."}
        let skillset = ["Novice", "Intermediate", "Advanced"];
        updatedRecipe.skillLevel = updatedRecipe.skillLevel.trim().toLowerCase();
        
        let choice = skillset.findIndex(skill => skill.toLowerCase() === updatedRecipe.skillLevel.toLowerCase());
        if(choice === -1){throw "Error: Must choose one of the following skill levels: Novice, Intermediate, Advanced"}
        updatedRecipe.skillLevel = skillset[choice];
        resObject.skillLevel = updatedRecipe.skillLevel;
    }

    // if steps
    if(updatedRecipe.steps){
        if(!Array.isArray(updatedRecipe.steps) || updatedRecipe.steps.length < 5){throw "Error: List of steps must be an array of at least 5 elements."}
        for(let x = 0; x < updatedRecipe.steps.length; x++){
            if(typeof updatedRecipe.steps[x] !== 'string' || updatedRecipe.steps[x].trim().length === 0){throw "Error: Must have valid string elements for steps."}
            updatedRecipe.steps[x] = updatedRecipe.steps[x].trim();
            if(updatedRecipe.steps[x].length < 20 || updatedRecipe.steps[x].search(/[!@#$%^&*><}?{()_/+=\-"]/g) !== -1){throw "Error: Must have steps of at least 20 characters. No special characters."}
        }
        resObject.steps = updatedRecipe.steps;
    }

    // mongodb
    const recipeCollections = await recipes();
   
    // to see if not user who posted recipe
    const existUser = await recipeCollections.findOne({_id: new ObjectId(id)});

    if(existUser.user._id !== user._id){throw "Error: Cannot update recipe b/c not orignal user."}
    
    const updateInfo = await recipeCollections.updateOne({ _id: new ObjectId(id)}, {$set: resObject});

    if(updateInfo.motifiedCount === 0){throw "Error: Could not update the recipe."}

    return await getRecipeById(id);
}

async function likeRecipe(id, recipeid){
    if(arguments.length !== 2){throw "Error: Must provide two arguments."}

    if(!id){throw "Error: Must provide a valid id"}
    if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
    id = id.trim();

    if(!recipeid){throw "Error: Must provide a valid id"}
    if(typeof recipeid !== 'string' || recipeid.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
    recipeid = recipeid.trim();

    if(!ObjectId.isValid(id)){throw "Error: Invalid object id."}
    if(!ObjectId.isValid(recipeid)){throw "Error: Invalid object id."}

    // mongodb
    const recipeCollections = await recipes();
    const recipe = await recipeCollections.findOne({_id: new ObjectId(recipeid)});

    if(!recipe){throw "Error: No recipe with that id."}

    if(!recipe.likes.includes(id)){
        recipe.likes.push(id);
    } else {
        recipe.likes.splice(recipe.likes.indexOf(id), 1);
    }

    const updateInfo = await recipeCollections.updateOne({ _id: new ObjectId(recipeid)}, {$set: recipe});

    if(updateInfo.motifiedCount === 0){throw "Error: Could not update the recipe."}
    return await getRecipeById(recipeid);
}


module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    likeRecipe
}