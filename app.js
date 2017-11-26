const DB_uri = "mongodb://BrainNotImplemented:O4Z1kriMfKYZqW0c@cluster0-shard-00-00-7x83i.mongodb.net:27017,cluster0-shard-00-01-7x83i.mongodb.net:27017,cluster0-shard-00-02-7x83i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
const express = require('express');
const methodOverride = require("method-override");

var bodyParser = require('body-parser');
var session = require('express-session');
const app = express();

var MongoClient = require('mongodb').MongoClient;
var database = null;

//Controllers
var userController = require('./controllers/users.js');

// Middleware starts here

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret:'501brainnotimplemented'}));
/*
Set database in every request. This way we don't have to make a new connection to 
Mongo everytime.
*/
app.use(function(req, res, next){
	req.db = database;
	next();
});

/*
	Sets a variable that checks if the user is logged in. You can now use req.loggedIn to check if
	the user is logged in.
*/
app.use(function(req,res,next){
	console.log(req.session);
	if(req.session.userId){
		req.loggedIn = true;
	} else {
		req.loggedIn = false;
	}
	next();
});

//Middleware ends here


app.put('/user', userController.create);
app.get('/user', userController.get);

app.post('/login', userController.login);
app.post('/logout', userController.login);


// Support routes
app.get('/', (req, res) => {
	res.render("main/index");
});

MongoClient.connect(DB_uri, function(err, db) {
	console.log('Connected to database');
	//Sets db into database
	database = db;
	app.listen(3000, () => console.log('Listening'));
});