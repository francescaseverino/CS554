// Setup server, session and middleware here.
const express = require('express');
const app = express();
const configRoutes = require('./routes');
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/characters/:id', async (req, res, next) => {
  if(isNaN(req.params.id)){
    next();
  } else{
    let id = req.params.id;
    id = id.trim();
    const exists = await client.exists(id);
    if(exists){
      console.log('in cashe');
      let character = await client.json.get(id);
      await client.lPush('history', JSON.stringify(character));
      return res.status(200).json(character);
    } else {
      next();
    }
  }
})

app.use('/api/comics/:id', async (req, res, next) => {
  let id = req.params.id;
  id = id.trim();
  if(isNaN(id)){
    next()
  } else {
    const exists = await client.exists(id);
    if(exists){
      console.log('in cashe');
      let comics = await client.json.get(id);
      return res.status(200).json(comics);
    } else {
      next();
    }
  }

})

app.use('/api/stories/:id', async (req, res, next) => {
  let id = req.params.id;
  id = id.trim();
  if(isNaN(id)){
    next()
  } else {
    const exists = await client.exists(id);
    if(exists){
      console.log('in cashe');
      let stories = await client.json.get(id);
      return res.status(200).json(stories);
    } else {
      next();
    }
  }

})
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});