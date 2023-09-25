const marvel = require('../data/marvel');
const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

router
    .route('/api/characters/history')
    .get(async(req, res)=>{
        try{
            const list = await client.lRange('history', 0, 19);
            return res.status(200).json(list.map(JSON.parse));
        } catch (e) {
            return res.status(404).json({error: e});
        }
    })

router
    .route('/api/characters/:id')
    .get(async(req, res)=>{
        let id = req.params.id;
        try{
            if(!id){throw "Error: Must provide id"}
            if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a valid string."}
            if(isNaN(id)){throw "Error: Must be an Integer."}
            id = id.trim();
        } catch (e) {
            return res.status(400).json({error: e});
        }

        try{
            const character = await marvel.getById(id, "characters");
            if(!character){throw "Error: No character found."}

            console.log("wasnt in the cashe");

            await client.json.set(id, '$', character);
            let results = await client.json.get(id);
            await client.lPush('history', JSON.stringify(results));
            return res.status(200).json(results);
            
        } catch (e) {
            return res.status(404).json({error: e});
        }
    })


router
    .route('/api/comics/:id')
    .get(async(req, res)=>{
        let id = req.params.id;
        try{
            if(!id){throw "Error: Must provide id"}
            if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a valid string."}
            if(isNaN(id)){throw "Error: Must be an Integer."}
            id = id.trim();
        } catch (e) {
            return res.status(400).json({error: e});
        }

        try{
            const comic = await marvel.getById(id, "comics");
            if(!comic){throw "Error: No comic found."}

            console.log("wasnt in the cashe");

            await client.json.set(id, '$', comic);
            let results = await client.json.get(id);
            return res.status(200).json(results);
        } catch (e) {
            return res.status(404).json({error: e});
        }
    })

router
    .route('/api/stories/:id')
    .get(async(req, res)=>{
        let id = req.params.id;
        try{
            if(!id){throw "Error: Must provide id"}
            if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a valid string."}
            if(isNaN(id)){throw "Error: Must be an Integer."}
            id = id.trim();
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try{
            const story = await marvel.getById(id, "stories");
            if(!story){throw "Error: No story found."}

            console.log("wasnt in the cashe");

            await client.json.set(id, '$', story);
            let results = await client.json.get(id);
            return res.status(200).json(results);
        } catch (e) {
            return res.status(404).json({error: e});
        }
    })

module.exports = router;