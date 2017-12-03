/*
	This file has all function and routes dedicated towards user management
*/
var crypto = require('crypto');
module.exports = {
	create: function(req, res,next){
		if(req.body.username == "" || req.body.password == "" || req.body.firstName == "" || req.body.lastName == ""){
			return res.status(400).json({error:"Missing fields"});
		}
		req.db.collection('users').insert({
			username : req.body.username,
			password : crypto.createHash('md5').update(req.body.password).digest("hex"),
			firstName : req.body.firstName,
			lastName : req.body.lastName
		}, function(err, result){
			if(err){
				if(err.code == 11000){
					return res.status(409).json({error:"Username is taken"});
				}
				return res.status(500).json({error:"Unable to insert user"});
			}
			return res.status(200).send();
		});
	},
	login: function(req,res, next){
		if(req.body.username == "" || req.body.password == ""){
			return res.status(400).json({error:"Missing fields"});
		}
		req.db.collection('users').findOne({
			username:req.body.username,
			password: crypto.createHash('md5').update(req.body.password).digest("hex")
		}, function(err, result){
			if(err){
				return res.status(500).json({error:"Something went wrong"});
			}
			if(!result){
				return res.status(401).json({error:"Invalid username or password"})
			} else {
				req.session.username = result.username;
				req.session.firstName = result.firstName;
				req.session.lastName = result.lastName;
				req.session.userId = result['_id'].toString();
				return res.status(200).json({success:'user logged in'});
			}
		});
	},
	logout: function(req,res, next){
		req.session.destroy(function(err){
			if(err){
				return res.status(500).json({error:"Something went wrong"});
			}
			return res.status(200).json({success:'user logged out'});
		});

	},
	get: function(req,res,next){
		if(!req.loggedIn && !req.query.uid){
			return res.status(401).json({error:'no logged in user'});
		}
		req.db.collection('users').findOne({
			username:req.query.uid?req.query.uid:req.session.username
		}, function(err, result){
			if(err){
				return res.status(500).json({error:"Something went wrong"});
			}
			if(result == null){
				return res.json({});
			}
			return res.json({
				username:result.username,
				firstName:result.firstName,
				lastName:result.lastName
			});
		});
	}
};
