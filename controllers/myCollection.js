// Endpoint to create the mapping (CREATE)
module.exports = {
  create: function(req, res, next){
    req.db.collection('UserToImageMapping').insert({
      username : req.body.username,
      imageId : req.body.imageId
    }, function(err, result){
      if (err){
        if (err.code == 11000){
          return res.status(409).json({error: 'Image is already in your collection.'});
        }
        return res.status(500).json({error:'Unable to add the image to your collection.'});
      }
      return res.status(200).send();
    });
  },

  get: function(req, res, next){
    var query = {};
    query["username"] = req.params.username;
    req.db.collection('UserToImageMapping').find(query).toArray(function(err, result){
      if (err){
        return res.status(500).json("Retrieval failed.");
      }
      if (result == null){
        return res.json({});
      }
      return res.send(result);
    });
  },

  delete: function(req, res, next){
    var query = {};
    query["imageId"] = req.params.imageId;
    req.db.collection('UserToImageMapping').deleteOne(query, function(err, results){
      if (err){
        return res.status(500).json("Unable to delete image");
      }
      return res.status(200).send("Deleted the image.");
    });
  },

update: function(req, res, next){
  var query = {};
  query["username"] = req.params.username;
  query["imageId"] = req.params.imageId;
  req.db.collection('UserToImageMapping').updateOne(query,{
    username : req.body.username,
    imageId : req.body.imageId
  }, function(err, result){
    if (err) {
      return res.status(500).json("Ubable to update the image chosen.");
    }
    return res.status(200).send("Updated your collection with the new image.");
  });
}
}
