const express = require('express');
const router = express.Router();
//const article = require('../source/data/article');
const content = require('../source/data/content');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');
const crypto = require('crypto');

router.get('/', function(req, res) {
	let obj = {title: "Главная страница"};
	Object.assign(obj, content);
	res.render('pages/index', obj);
});

router.post('/', (req, res) => {
	//требуем наличия логина и пароля в теле запроса
	if (!req.body.login || !req.body.password) {
		//если не указан логин или пароль - сообщаем об этом
		return res.json({status: 'Укажите логин и пароль!'});
	}

	//получаем модель пользователя и шифруем введенный пароль
	const Model = mongoose.model('user');
	const password = crypto.createHash('md5').update(req.body.password).digest('hex');

	//пытаемся найти пользователя с указанным логином и паролем
	Model.findOne({login: req.body.login, password: password}).then(item => {
		//если такой пользователь не найден - сообщаем об этом
		if (!item) {
			res.json({status: 'Логин и/или пароль введены неверно!'});
		} else {
			//если найден, то делаем пометку об этом в сессии пользователя, который сделал запрос
			req.session.isAdmin = true;
			res.json({status: 'Авторизация успешна!'});
		}
	});
});

router.get('/blog', function(req, res) {
	let obj = {title: "Blog", blog_footer : 'blog__footer'};
	const Model = mongoose.model('blog');
	Model.find().then(items => {
		Object.assign(obj, content);
		Object.assign(obj, {blog: items});
		res.render('pages/blog', obj);
	});
});

router.get('/works', function(req, res) {
	let obj = {title: "Works"};
	const Model = mongoose.model('pic');
	Model.find().then(items => {
		Object.assign(obj, content);
		Object.assign(obj, {works: items});
		console.log(obj);
		res.render('pages/works', obj);
	});
});

router.get('/about', function(req, res) {
	let obj = {title: "About"};
	const Model = mongoose.model('skills');
	Model.find().then(items => {
		Object.assign(obj, content);
		Object.assign(obj, {skills: items});
		res.render('pages/about', obj);
	});
});

module.exports = router;