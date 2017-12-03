/*
* This file contains all the function use to implement the api/message interface
*/
module.exports = {
	broadcast : function(req, res, next){
		if (req.body.data == undefined){
			return res.status(400).json({error:"Missing field: data"});
		}
		req.db.collection('counters').findAndModify({_id: "messageId" }, [['_id','asc']], {$inc:{sequence_value: 1}},{new:true}, function(err, doc){
			req.db.collection('messages').insert({msgId : doc.value.sequence_value, message : req.body.data}, function(err, result){
				if (err){
					if (err.code == 11000){
						return res.status(409).json({error:"Message already exist."});
					}
					return res.status(500).json({error:"Unable to insert message"});
				}
				return res.status(200).send();
			});
		});
		
	},
	get : function(req, res, next){
		/*req.db.listCollections().toArray(function(err, result){
			console.log(result);
		});*/
		req.db.collection('messages').find({}, {_id : false}).toArray(function(err, result){
			if(err){
				return res.status(500).json({error:"Retrieval failed"});
			}
			if(result == null){
				return res.json({});
			}
			return res.send(result);
		});
	},
	delete : function(req, res, next){
		var query= {};
		query["msgId"] = parseInt(req.params.msgId);
		req.db.collection('messages').deleteOne(query, function(err, results){
			if (err){
				return res.status(500).json({error:"Unable to delete message"});
			}
			if (results.result.n > 0){
				return res.status(200).send("Deleted message");
			}
			else{
				return res.status(200).send("Failed to delete the message");
			}
		});
	},
	getMsgstoUser : function(req, res, next){
		req.db.collection('messages').find({}).toArray(function(err, msgs){
			if(err){
				return res.status(500).json({error:"Retrieval for message failed"});
			}
			if(msgs == null){
				next([]);
				return [];
			}
			var usermsgs = [];
			for (i = 0; i < msgs.length; i++){
				usermsgs.push(msgs[i]["message"]);
			}
			next(usermsgs);
			return usermsgs;
		});
	}
}	