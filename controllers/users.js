/*
	This file has all function and routes dedicated towards user management
*/
var crypto = require('crypto');
module.exports = {
	create: function(req, res,next){
		if(req.body.username == undefined || req.body.password == undefined || req.body.firstName == undefined || req.body.lastName == undefined){
			return res.status(400).json({error:"Missing fields"});
		}
		
		req.db.collection('users').insert({
			username : req.body.username, 
			password : crypto.createHash('md5').update(req.body.password).digest("hex"),
			firstName : req.body.firstName,
			lastName : req.body.lastName
		}, function(err, result){
			if(err){
				return res.status(500).json({error:"Unable to insert user"})
			}
			return res.status(200);
		});
	},
	login: function(req,res, next){
		if(req.body.username == undefined || req.body.password == undefined){
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
				req.session.userId = result['_id'].str;
				return res.status(200).json({success:'user logged in'});
			}
		});
	},
	logout: function(req,res, next){
		delete req.session;
		return res.status(200).json({success:'user logged out'});
	}

};