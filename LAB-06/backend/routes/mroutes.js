const marvel = require("../data/marvel");
const express = require('express');
const router = express.Router();

const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

// respond with JSON data of a paginated list of Marvel Comics from the API
router
    .route('/api/comics/page/:pagenum')
    .get(async(req, res)=>{
        let page = req.params.pagenum;

        try{
            if(!page){throw "Error: Must provide a page"}
            if(Number.isInteger(page) || page.trim().length === 0){throw "Error: Offset must be an integer."}
            page = parseInt(page);

            if(page <= 0){throw "Error: Page must be a postive number."}
        } catch (e) {
            return res.status(400).json({error: e});
        }
        

        try{
            page = parseInt(page);
            let key = 'page'+page;
            let offset = 50 * (page -1);

            const comics = await marvel.getAll(offset);

            if(comics.results.length === 0){
                return res.status(404).json({error: 'No more comics.'})
            }

            console.log("wasnt in the cashe");

            await client.set(key, JSON.stringify(comics));

            let results = JSON.parse(await client.get(key));

            return res.status(200).json(results);
        } catch (e) {
            return res.status(404).json({error: e});
        }
    })

// more detailed JSON data about a single comic
router
    .route('/api/comics/:id')
    .get(async(req, res)=>{
        let id = req.params.id;

        try{
            if(!id){throw "Error: Must provide id"}
            if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a valid string."}
            if(isNaN(id)){throw "Error: Must be an Integer."}

        } catch (e) {
            return res.status(400).json({error: e});
        }
        
        id = id.trim();

        try{
            const comic = await marvel.getById(id);
            if(!comic){throw "Error: No comic found."}

            console.log("wasnt in the cashe");

            await client.set(id, JSON.stringify(comic));

            let results = JSON.parse(await client.get(id));
            return res.status(200).json(results);

        } catch (e) {
            return res.status(404).json({error: e});
        }
    })

module.exports = router;