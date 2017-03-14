'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PicSchema = new Schema({
	name: {
		type: String,
		required: [true, "Укажите описание картинки"]
	},
	tech: {
		type: String,
		required: [true, "Укажите технологию"]
	},
	url: {
		type: String,
		required: [true, "Укажите ссылку"]
	},
	picture: {
		type: String
	}
});

mongoose.model('pic', PicSchema);