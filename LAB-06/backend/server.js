// Setup server, session and middleware here.
const express = require('express');
const app = express();
const cors = require('cors');
const configRoutes = require('./routes');

const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/comics/:id', async (req, res, next) => {
  let id = req.params.id;
  id = id.trim();
  if(isNaN(id)){
    next()
  } else {
    const exists = await client.exists(id);
    if(exists){

      console.log('in cashe');

      let comics = JSON.parse(await client.get(id));
      return res.status(200).json(comics);
    } else {
      next();
    }
  }

})

app.use('/api/comics/page/:pagenum', async (req, res, next) => {
  let pagenum = req.params.pagenum;
  pagenum = pagenum.trim();
  if(isNaN(pagenum)){
    next()
  } else {
    const exists = await client.exists('page'+pagenum);
    if(exists){
      
      console.log('in cashe');

      let comics = JSON.parse(await client.get('page'+pagenum));
      return res.status(200).json(comics);

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