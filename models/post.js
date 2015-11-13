'use strict';

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	name: String,
	message: String,
	subject: String,
	time: String
});

var Post = mongoose.model('Post', postSchema);


module.exports = Post;
