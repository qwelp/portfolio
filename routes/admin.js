const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
//const content = require('../source/data/content');
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
	const Model = mongoose.model('skills');
	Model.find().then(items => {
		Object.assign(obj, {skills: items});
		res.render('pages/admin', obj);
	});
});

router.post('/', isAdmin, function (req, res) {
	let form = new formidable.IncomingForm();
	form.uploadDir = config.upload;
	form.parse(req, function (err, fields, files) {
		if (err) {
			//res.statusCode = 500;
			return res.json({status: 'Не удалось загрузить картинку'});
		}
		const Model = mongoose.model('pic');
		fs
			.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
				if (err) {
					fs.unlink(path.join(config.upload, files.photo.name));
					fs.rename(files.photo.path, files.photo.name);
				}

				let dir = config.upload.substr(config.upload.indexOf('/'));


				let item = new Model({
					name: fields.name,
					tech: fields.tech,
					url: fields.url,
					picture: path.join(dir, files.photo.name)
				});

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

				res.json({status: 'Картинка успешно загружена'});
			});
	});
});

module.exports = router;