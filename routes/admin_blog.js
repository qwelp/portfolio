const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const content = require('../source/data/content');
const mongoose = require('mongoose');

const isAdmin = (req, res, next) => {
	// если в сессии текущего пользователя есть пометка о том, что он является
	// администратором
	if (req.session.isAdmin) {
		//то всё хорошо :)
		return next();
	}
	//если нет, то перебросить пользователя на главную страницу сайта
	res.redirect('/');
};

router.get('/', isAdmin, function (req, res) {
	let obj = {
		title: 'Админка'
	};
	Object.assign(obj, content);
	res.render('pages/admin', obj);
});

router.post('/', isAdmin, (req, res) => {
	//требуем наличия заголовка, даты и текста
	if (!req.body.title || !req.body.date || !req.body.text) {
		//если что-либо не указано - сообщаем об этом
		return res.json({status: 'Укажите данные!'});
	}
	const Model = mongoose.model('blog');
	let item = new Model({title: req.body.title, date: req.body.date, body: req.body.text});
	item.save().then(
		(i) => {return res.json({status: 'Запись успешно добавлена'});},
		(e) => {
			const error = Object
				.keys(e.errors)
				.map(key => e.errors[key].message)
				.join(', ');
			res.json({status: 'При добавление записи произошла ошибка: ' + error});
		}
	);
});



module.exports = router;