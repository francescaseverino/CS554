const mongoCollections = require('../config/mongoCollections');
const recipes = mongoCollections.recipes;
const{ ObjectId } = require('mongodb');
const recipfunc = require('../data/recipes');

async function createReview(
    recipeid,
    user,
    rating,
    review
){
    if(arguments.length !== 4){throw "Error: Must provide 4 arguments."}

    if(!recipeid){throw "Error: Must provide a recipe id."}
    if(!user){throw "Error: Must be a logged in user."}
    if(!rating){throw "Error: Must provide a rating."}
    if(!review){throw "Error: Must provide a review."}  
    
    if(typeof recipeid !== 'string' || recipeid.trim().length == 0){throw "Error: RecipeId must be a valid string."}
    if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be valid user object."}
    if(typeof rating !== 'number' || rating < 1 || rating > 5|| isNaN(rating)){throw "Error: Rating must be a positive number between 1 and 5."}
    if(typeof review !== 'string' || review.trim().length == 0){throw "Error: Must be a valid string and with no empty spaces."}

    // recipeid
    recipeid = recipeid.trim();
    if(!ObjectId.isValid(recipeid)){throw "Error: Invalid object id."}

    // user
    if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}
    
    // rating
    if(!Number.isInteger(rating)){throw "Error: Must be a whole number."}
    rating = Number.parseInt(rating);

    // review
    review = review.trim();
    if(review.length < 25 || review.search(/[@#$%^&*><}?{()_/+=\-"]/g) != -1){throw "Error: Must be at least 25 characters long."}

    // mongodb
    const recipecollection = await recipes();
    
        // to see if user already commented
    const existUser = await recipecollection.findOne({_id: new ObjectId(recipeid)});

    let exUser = existUser.reviews.find((obj)=>{
        return obj.user._id.toString() === user._id.toString();
    })
    if(exUser){throw "Error: Cannot leave more than one review."}


    let newReview = {
        _id: new ObjectId(),
        user: user,
        rating: rating,
        review: review
    };

    let updatedInfo = await recipecollection.updateOne(
        {_id: new ObjectId(recipeid)},
        {$addToSet: {reviews: newReview}}
    );

    if (!updatedInfo.modifiedCount && !updatedInfo.matchedCount) {throw "Error: Could not add review"}

    const recip = await recipfunc.getRecipeById(recipeid);
    return recip;
}

async function getReviewById(
    reviewid
){
    if(arguments.length != 1){throw "Error: Must provide one argument."}

    if(!reviewid){throw "Error: Must provide a valid id"}
    if(typeof reviewid !== 'string' || reviewid.trim().length == 0){throw "Error: Must provide a type string id and without spaces."}
    reviewid = reviewid.trim();

    if(!ObjectId.isValid(reviewid)){throw "Error: Invalid object id."}

    const recipeCollection = await recipes();

    const recipe = await recipeCollection.findOne(
        {'reviews': {elemMatch: {_id: new ObjectId(reviewid)}}},
        {projection: {_id:0, reviews:1}}
    );

    if(!recipe){throw "Error: Review not found."}

    let review = recipe.reviews.find((obj)=>{
        return obj._id.toString() === ObjectId(reviewid).toString();
    })

    if(!review){throw "Error: Review not found"}
    return review;
}

async function deleteReview(
    user, 
    recipeid,
    reviewid
){
    if(arguments.length != 3){throw "Error: Must provide three argument."}

    // user
    if(!user){throw "Error: Must be a logged in user."}
    if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be valid user object."}
    if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}

    // recipeid
    if(!recipeid){throw "Error: Must provide a valid id"}
    if(typeof recipeid !== 'string' || recipeid.trim().length == 0){throw "Error: Must provide a type string id and without spaces."}
    recipeid = recipeid.trim();

    if(!ObjectId.isValid(recipeid)){throw "Error: Invalid object id."}


    // reviewid
    if(!reviewid){throw "Error: Must provide a valid id"}
    if(typeof reviewid !== 'string' || reviewid.trim().length == 0){throw "Error: Must provide a type string id and without spaces."}
    reviewid = reviewid.trim();

    if(!ObjectId.isValid(reviewid)){throw "Error: Invalid object id."}

    const recipeCollection = await recipes();

    // to see if not user who reviewed
    const existUser = await recipeCollection.findOne({_id: new ObjectId(recipeid)});
    let exUser = existUser.reviews.find((obj)=>{
        return obj.user._id.toString() === user._id.toString();
    })
    if(!exUser){throw "Error: Cannot delete review b/c not orignal user."}
    
    
    const updateInfo = await recipeCollection.updateOne(
        { _id: new ObjectId(recipeid)},
        {$pull: { reviews: {_id: new ObjectId(reviewid)}}}
    );

    if (!updateInfo.modifiedCount && !updateInfo.matchedCount) {throw 'Error: Could not update recipe info'}

    return await recipfunc.getRecipeById(recipeid);
} 

module.exports = {
    createReview,
    getReviewById,
    deleteReview
}