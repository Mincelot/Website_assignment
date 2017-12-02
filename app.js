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
var messageController = require('./controllers/messages.js');

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

// Allow CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


//Middleware ends here


app.put('/user', userController.create);
app.get('/user', userController.get);

app.post('/login', userController.login);
app.get('/logout', userController.logout);

app.get('/api/messages', messageController.get);
app.post('/api/messages', messageController.broadcast);
app.delete('/api/messages/:msgId', messageController.delete);

app.get('/user/messages', function(req, res, next){
	if (req.loggedIn){
		messageController.getMsgstoUser(req, res, function (msgs){
			console.log(msgs);
			res.json({messages: msgs});
		});
		
	} else {
		res.json({messages: []});
	}
});
// Support routes
app.get('/', (req, res) => {
	res.redirect("/index");
});

app.get('/index', (req, res) => {
	if (req.loggedIn){
		messageController.getMsgstoUser(req, res, function (msgs){
			console.log(msgs);
			res.render("main/index", {data : {username: req.session.username}});
		});
	}
	else{
		// Redirect to login screen
		res.redirect('/loginpage');
	}
});

// Access login page from sign up start screen
app.get('/loginpage', (req, res) => {
	res.render("main/login");
});

MongoClient.connect(DB_uri, function(err, db) {
	console.log('Connected to database');
	//Sets db into database
	database = db;
	app.listen(3000, () => console.log('Listening'));
});
