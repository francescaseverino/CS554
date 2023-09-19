const express = require('express');
const router = express.Router();
const data = require('../data');
const recipes = data.recipes;
const reviews = data.reviews;
const{ ObjectId } = require('mongodb');

// GET: /recipes
router
    .route('/')
    .get(async (req, res)=>{
        let pg = parseInt(req.query.page);
        let start = (pg-1) * 50;
        let end = start + 50;
        
        try{
            if(typeof pg !== 'number' || pg <= 0 || isNaN(pg)){throw "Error: Page must be a positive number."}
            if(!Number.isInteger(pg)){throw "Error: Page must be an integer."}

            if(typeof start !== 'number' || start < 0){throw "Error: Start must be a positive number."}
            if(typeof end !== 'number' || end < 0){throw "Error: End must be a positive number."}
            if(!Number.isInteger(start) || !Number.isInteger(end)){throw "Error: Must provide integers only."}

        } catch(e){
            return res.status(400).json({error: e});
        }

        try{
            const recipelist = await recipes.getAllRecipes(start, end);
            
            if(recipelist.length === 0){
                return res.status(404).json("No more recipes.")
            }
            return res.status(200).json(recipelist);
        
        } catch(e){
            return res.status(500).json({error: e})
        }   


    })
// POST: /recipes
router
    .route('/')
    .post(async (req, res)=>{
        let title = req.body.title;
        let ingredients = req.body.ingredients;
        let skillLevel = req.body.skillLevel;
        let steps = req.body.steps;


        try{
            if(!req.session.user){throw "Error: Must be a logged user."}
            
            if(!title){throw "Error: Must provide a title."}
            if(!ingredients){throw "Error: Must provide at least 4 ingredients."}
            if(!skillLevel){throw "Error: Must choose a skill level."}
            if(!steps){throw "Error: Must provide at least 5 steps."}

            if(typeof title !== 'string' || title.trim().length === 0) {throw "Error: Title must be a valid string."}
            if(!Array.isArray(ingredients) || ingredients.length < 4) {throw "Error: List of ingredients must be an array of at least 4 elements."}
            if(typeof skillLevel !== 'string' || skillLevel.trim().length === 0){throw "Error: SkillLevel must be a valid string."}
            if(!Array.isArray(steps) || steps.length < 5){throw "Error: List of steps must be an array of at least 5 elements."}
            
        
            // title
            if(title.length < 5 || title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Title must be at least 5 characters w/ no punctation"}
            title = title.trim();
        
            // ingredients
            for(let x = 0; x < ingredients.length; x++){
                if(typeof ingredients[x] !== 'string' || ingredients[x].trim().length === 0){throw "Error: Must have valid string elements for ingredients"}
                ingredients[x] = ingredients[x].trim();
                if(ingredients[x].length < 4 || ingredients[x].length > 50 || ingredients[x].search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Must have an ingredient of at least 4 characters and max of 50. No punctations"}
            }
        
            skillLevel
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

        } catch (e) {
            return res.status(400).json({error: e});
        }

        let user = {
            _id: req.session.user._id.toString(),
            username: req.session.user.username
        };

        try{
            //user
            if(!user){throw "Error: Must be a logged in user."}
            if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}
            if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be a valid user object."}
        
        } catch (e){
            return res.status(400).json({error: e});
        }
        
        try{
            const recipe = await recipes.createRecipe(title, ingredients, skillLevel, steps, user);

            return res.status(200).json(recipe);

        } catch(e) {
            return res.status(500).json({error: e});
        }
    })
// GET: /recipes/:id
router
    .route('/:id')
    .get(async (req, res)=>{
        let id = req.params.id;

        try{
            if(!id){throw "Error: Must provide a valid id"}
            if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
            id = id.trim();
        
            if(!ObjectId.isValid(id)){throw "Error: Invalid object id."}

        } catch(e) {
            return res.status(404).json({error: e});
        }

        try{
            const recipe = await recipes.getRecipeById(id);
            return res.status(200).json(recipe);
        } catch (e) {
            return res.status(500).json({error: e});
        }
    })
// PATCH: /recipes/:id
router
    .route('/:id')
    .patch(async (req, res)=>{
        let id = req.params.id;
        let updatedRecipe = {};

        try{
            if(!req.session.user){throw "Error: Must be a logged user."}

            // id
            if(!id){throw "Error: Must provide a valid id"}
            if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
            id = id.trim();

            if(!ObjectId.isValid(id)){throw "Error: Invalid object id."}


            // update recipe
            if(!updatedRecipe){throw "Error: Must provide an updated object recipe."}
            if(typeof updatedRecipe !== 'object' || Array.isArray(updatedRecipe)){throw "Error: Must be a valid object."}

            
            if(req.body.reviews || req.body.likes || req.body.user){throw "Error: Cannot modify these fields ... reviews, likes, user."}
            if(!req.body.title && !req.body.ingredients && !req.body.skillLevel && !req.body.steps){throw "Error: Must request at least one field."}

            // if title 
            if(req.body.title){
                updatedRecipe['title'] = req.body.title;
                if(typeof updatedRecipe.title !== 'string' || updatedRecipe.title.trim().length === 0) {throw "Error: Title must be a valid string."}
                if(updatedRecipe.title.length < 5 || updatedRecipe.title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Title must be at least 5 characters w/ no punctation"}
                updatedRecipe.title = updatedRecipe.title.trim();
            }

            // if ingredients
            if(req.body.ingredients){
                updatedRecipe['ingredients'] = req.body.ingredients;
                if(!Array.isArray(updatedRecipe.ingredients) || updatedRecipe.ingredients.length < 4) {throw "Error: List of ingredients must be an array of at least 4 elements."}
                for(let x = 0; x < updatedRecipe.ingredients.length; x++){
                    if(typeof updatedRecipe.ingredients[x] !== 'string' || updatedRecipe.ingredients[x].trim().length === 0){throw "Error: Must have valid string elements for ingredients"}
                    updatedRecipe.ingredients[x] = updatedRecipe.ingredients[x].trim();
                    if(updatedRecipe.ingredients[x].length < 4 || updatedRecipe.ingredients[x].length > 50 || updatedRecipe.ingredients[x].search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1){throw "Error: Must have an ingredient of at least 4 characters and max of 50. No punctations"}
                }
            }

            // if skill level
            if(req.body.skillLevel){
                updatedRecipe['skillLevel'] = req.body.skillLevel;
                if(typeof updatedRecipe.skillLevel !== 'string' || updatedRecipe.skillLevel.trim().length === 0){throw "Error: SkillLevel must be a valid string."}
                let skillset = ["Novice", "Intermediate", "Advanced"];
                updatedRecipe.skillLevel = updatedRecipe.skillLevel.trim().toLowerCase();
                
                let choice = skillset.findIndex(skill => skill.toLowerCase() === updatedRecipe.skillLevel.toLowerCase());
                if(choice === -1){throw "Error: Must choose one of the following skill levels: Novice, Intermediate, Advanced"}
                updatedRecipe.skillLevel = skillset[choice];
            }

            // if steps
            if(req.body.steps){
                updatedRecipe['steps'] = req.body.steps;
                if(!Array.isArray(updatedRecipe.steps) || updatedRecipe.steps.length < 5){throw "Error: List of steps must be an array of at least 5 elements."}
                for(let x = 0; x < updatedRecipe.steps.length; x++){
                    if(typeof updatedRecipe.steps[x] !== 'string' || updatedRecipe.steps[x].trim().length === 0){throw "Error: Must have valid string elements for steps."}
                    updatedRecipe.steps[x] = updatedRecipe.steps[x].trim();
                    if(updatedRecipe.steps[x].length < 20 || updatedRecipe.steps[x].search(/[!@#$%^&*><}?{()_/+=\-"]/g) !== -1){throw "Error: Must have steps of at least 20 characters. No special characters."}
                }
            }
        } catch(e) {
            return res.status(400).json({error: e});
        }

        let user = {
            _id: req.session.user._id.toString(),
            username: req.session.user.username
        };

        try{
            // user
            if(!user){throw "Error: Must be a logged in user."}
            if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be a valid user object."}
            if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}

        } catch(e){
            return res.status(400).json({error: e});
        }

        try{
            const updated = await recipes.updateRecipe(id, updatedRecipe, user);
            return res.status(200).json(updated);
        }catch(e){
            return res.status(500).json({error: e});
        }
    })
// POST: /recipes/:id/reviews
router
    .route('/:id/reviews')
    .post(async (req, res)=>{
        let recipeid = req.params.id;
        let rating = req.body.rating;
        let review = req.body.review;

        try{
            if(!req.session.user){throw "Error: Must be a logged user."}

            if(!recipeid){throw "Error: Must provide a recipe id."}
            if(!rating){throw "Error: Must provide a rating."}
            if(!review){throw "Error: Must provide a review."}  
            
            if(typeof recipeid !== 'string' || recipeid.trim().length === 0){throw "Error: RecipeId must be a valid string."}
            if(typeof rating !== 'number' || rating < 1 || rating > 5|| isNaN(rating)){throw "Error: Rating must be a positive number between 1 and 5."}
            if(typeof review !== 'string' || review.trim().length === 0){throw "Error: Must be a valid string and with no empty spaces."}

            // recipeid
            recipeid = recipeid.trim();
            if(!ObjectId.isValid(recipeid)){throw "Error: Invalid object id."}
            
            // rating
            if(!Number.isInteger(rating)){throw "Error: Must be a whole number."}
            rating = Number.parseInt(rating);

            // review
            review = review.trim();
            if(review.length < 25 || review.search(/[@#$%^&*><}?{()_/+=\-"]/g) != -1){throw "Error: Must be at least 25 characters long."}
        } catch (e){
            return res.status(400).json({error: e});
        }

        let user = {
            _id: req.session.user._id.toString(),
            username: req.session.user.username
        };

        try{
            // user
            if(!user){throw "Error: Must be a logged in user."}
            if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be a valid user object."}
            if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}

        } catch(e){
            return res.status(400).json({error: e});
        }

        try{
            const posted_review = await reviews.createReview(recipeid, user, rating, review);
            return res.status(200).json(posted_review);
        } catch(e){
            return res.status(500).json({error: e});
        }
        })
// DELETE: /recipes/:recipeId/:reviewId
router
    .route('/:recipeId/:reviewId')
    .delete(async (req, res)=>{
        let recipeid = req.params.recipeId;
        let reviewid = req.params.reviewId;

        try{
            if(!req.session.user){throw "Error: Must be a logged user."}

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

        } catch (e){
            return res.status(400).json({error: e});
        }

        let user = {
            _id: req.session.user._id.toString(),
            username: req.session.user.username
        };

        try{
            // user
            if(!user){throw "Error: Must be a logged in user."}
            if(typeof user !== 'object' || Array.isArray(user)){throw "Error: Must be a valid user object."}
            if(!(user.hasOwnProperty('_id') && user.hasOwnProperty('username'))){throw "Error: Must have a valid object for user."}

        } catch(e){
            return res.status(400).json({error: e});
        }

        try{
            const removedReview = await reviews.deleteReview(user, recipeid, reviewid);
            return res.status(200).json(removedReview);
        } catch(e){
            return res.status(500).json({error: e});
        }
    })
// POST: /recipes/:id/likes
router
    .route('/:id/likes')
    .post(async (req, res)=>{
        let recipeid = req.params.id;
        let id = req.session.user._id;

        try{
            if(!req.session.user){throw "Error: Must be a logged user."}
            
            if(!id){throw "Error: Must provide a valid id"}
            if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
            id = id.trim();

            if(!recipeid){throw "Error: Must provide a valid id"}
            if(typeof recipeid !== 'string' || recipeid.trim().length === 0){throw "Error: Must provide a type string id and without spaces."}
            recipeid = recipeid.trim();

            if(!ObjectId.isValid(id)){throw "Error: Invalid object id."}
            if(!ObjectId.isValid(recipeid)){throw "Error: Invalid object id."}
        
        } catch(e) {
            return res.status(400).json({error: e})
        }

        try{
            const like_recipe = await recipes.likeRecipe(id, recipeid);
            return res.status(200).json(like_recipe);
        } catch(e){
            return res.status(500).json({error: e})
        }
    })

module.exports = router;