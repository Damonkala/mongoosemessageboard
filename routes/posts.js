'use strict';

var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', function(req, res){
	Post.find({}, function(err, posts) {
		res.render('post', {title: 'Posty!', items: posts})
		// res.send(posts);
	});
});

router.post('/', function(req, res){
	var post = new Post(req.body);
	post.save(function(err, savedPost){
		console.log(savedPost);
	})
});

router.put('/', function(req, res){
	Post.findByIdAndUpdate(req.body._id , req.body, function(err, post){
		res.send(post);
	});
});
router.delete('/', function(req, res){
	console.log(req.body.time);
	Post.remove({time: req.body.time}, function(err, post){
		res.send(post);
	});
});



module.exports = router;
