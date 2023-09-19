// Setup server, session and middleware here.
const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');
const static = express.static(__dirname + '/public');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  })
);

// log all request bodies if there is a request body (GET routes can/will just log an empty object for the request body). 
// Do not log passwords from the request body if the request body contains a password field. 

app.use((req, res, next) =>{
  if(req.body.password && (req.method === "POST") && req.body.name){
    console.log("The Request Body:");
    console.log({name: req.body.name});
    console.log({username: req.body.username});
  } else if(req.body.password && (req.method === "POST")){
    console.log("The Request Body:");
    console.log({username: req.body.username});
  } else{
    console.log("The Request Body:");
    console.log(req.body);
  }
  
  next();
});

//log the url path they are requesting, and the HTTP verb they are using to make the request. 
app.use((req, res, next) =>{

  console.log(`The URL path: http://localhost:3000${req.originalUrl}`);
  console.log(`HTTP verb: ${req.method}`);

  next();
});

let listOfURL = {};
// You will also keep track of many times a particular URL has been requested, updating and logging with each request.
app.use((req, res, next) =>{

  const req_url = req.originalUrl;

  if(listOfURL[req_url]){
    listOfURL[req_url] += 1;
    console.log(`This URL (http://localhost:3000${req_url}) has been requested ${listOfURL[req_url]} time(s).`)
  } else{
    listOfURL[req_url] = 1;
    console.log(`This URL (http://localhost:3000${req_url}) has been requested ${listOfURL[req_url]} time(s).`)
  }
  
  next();
});

configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
