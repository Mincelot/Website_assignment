
const express = require('express')
const methodOverride = require("method-override");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(methodOverride("_method"));

var uri = "mongodb://BrainNotImplemented:O4Z1kriMfKYZqW0c@cluster0-shard-00-00-7x83i.mongodb.net:27017,cluster0-shard-00-01-7x83i.mongodb.net:27017,cluster0-shard-00-02-7x83i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"


var createNewAccount = function(username, pass, db, callback){
	var collection = db.collection('documents');
	collection.insertOne({_id: 0, Username: username, Password: pass}, function(err, result){
		console.log("Registered an account with username: " + username);
		callback(result);
	})
}

var findUsers = function(db, callback) {
	  // Get the documents collection
	  var collection = db.collection('documents');
	  // Find some documents
	  collection.find({}).toArray(function(err, users) {
		console.log("Found the following records");
		console.dir(users);
		callback(users);
  });
}
var deleteAllUsers = function(db, callback) {
	var collection = db.collection('documents');
	collection.deleteMany({});
}



// Support routes
app.get('/', (req, res) => {
	res.redirect('/index')
})

app.get("/users/create", (req, res) => {
	res.send("Create an account");

	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		createNewAccount("Testuser1", "123123",db, function() {
			db.close();
		});
	});
});

app.get('/users', (req, res) => {
	res.send("Record of all users");
	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		findUsers(db, function() {
			db.close();
		});
	})
	
})


app.get("/users/deleteAll", (req, res) => {
	res.send("Delete all accounts");

	MongoClient.connect(uri, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		deleteAllUsers(db, function() {
			db.close();
		});
	});
});

// RESTFUL interface
app.get("/index", (req, res) => {
	res.render("main/index")
})

app.post("/users", (req, res) => {
	res.redirect('/index')
});

app.delete("/users/:uid/:photoid", (req, res) => {
	res.send("Suppose to delete a photo that the user liked.")
	res.redirect("/index")
})

app.listen(3000, () => console.log('Listening'))