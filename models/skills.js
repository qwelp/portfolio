'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillsSchema = new Schema({
	HTML5: {
		type: String,
		required: [true, "Укажите заголовак статьи"]
	},
	CSS3: {
		type: String,
		required: [true, "Укажите дату публикации"]
	},
	Js_Jquery: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	},
	Git: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	},
	Gulp: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	},
	Bower: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	},
	PHP: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	},
	mySQL: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	},
	Node_npm: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	},
	Mongodb: {
		type: String,
		required: [true, "Укажите содержимое статьи"]
	}
});

mongoose.model('skills', SkillsSchema);