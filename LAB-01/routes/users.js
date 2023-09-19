const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

router
    .route('/signup')
    .post(async (req, res)=>{
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;

        try{
            if(!name){throw "Error: Must provide a name."}
            if(!username){throw "Error: Must provide a username."}
            if(!password){throw "Error: Must provide a password."}

            if(typeof name !== 'string' || name.trim().length === 0){throw "Error: Must provide a valid string name."}
            if(typeof username !== 'string'|| username.trim().length === 0){throw "Error: Must provide a valid string username."}
            if(typeof password !== 'string'|| password.trim().length === 0){throw "Error: Must provide a valid string password."}
        
            if(username.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1 || username.search(" ") !== -1 || username.length < 5){throw "Error: Must provide a username with only alphanumeric characters and at least 5 characters long"}
            if(password.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) === -1 || password.search(/[0123456789]/g) === -1 || password.search(/[A-Z][a-z]/) === -1 || password.search(" ") !== -1 || password.length < 8){throw "Error: Must provide a password with at least one number, one uppercase letter, one lowercase letter, and one special character"}
        
        } catch(e){
            return res.status(400).json({error: e});
        }

        try{
            const user = await users.createUser(name, username, password);
            if(user){
                return res.status(200).json(user);
            } 
        } catch(e){
            return res.status(500).json({error: e});
        }
    })

router 
    .route('/login')
    .post(async (req, res)=>{
        const username = req.body.username;
        const password = req.body.password;

        try{
            if(!username){throw "Error: Must provide a username."}
            if(!password){throw "Error: Must provide a password."}

            if(typeof username != 'string'|| username.trim().length == 0){throw "Error: Must provide a username"}
            if(typeof password != 'string'|| password.trim().length == 0){throw "Error: Must provide a password"}
        
            if(username.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) !== -1 || username.search(" ") !== -1 || username.length < 5){throw "Error: Must provide a username with only alphanumeric characters and at least 5 characters long"}
            if(password.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) === -1 || password.search(/[0123456789]/g) === -1 || password.search(/[A-Z][a-z]/) === -1 || password.search(" ") !== -1 || password.length < 8){throw "Error: Must provide a password with at least one number, one uppercase letter, one lowercase letter, and one special character"}
            
        } catch(e){
            return res.status(400).json({error: e});
        }

        try{
            const user_login = await users.checkUser(username, password);
            if(user_login){
                req.session.user = {
                    _id: user_login._id,
                    username: user_login.username
                };
                return res.status(200).json({_id: user_login._id, username: user_login.username});
            }
        } catch(e){
            return res.status(400).json({error: e});
        }
    })

router
    .route('/logout')
    .get(async (req, res)=>{
        req.session.destroy();
        return res.status(200).json("Logged Out!");
    }) 

module.exports = router;