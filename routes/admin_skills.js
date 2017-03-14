const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config.json');


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

router.put('/', isAdmin, (req, res) => {

	const Model = mongoose.model('skills');
	const id = "58c77dd226f8697d2c233ace";

	Model.findById(id, function (err, Model) {
		if (err) return handleError(err);

		Model.HTML5 = req.body.HTML5;
		Model.CSS3 = req.body.CSS3;
		Model.Js_Jquery = req.body.Js_Jquery;
		Model.PHP = req.body.PHP;
		Model.mySQL = req.body.mySQL;
		Model.Node_npm = req.body.Node_npm;
		Model.Mongodb = req.body.Mongodb;
		Model.Git = req.body.Git;
		Model.Gulp = req.body.Gulp;
		Model.Bower = req.body.Bower;

		Model.save(function (err) {
			if (err) return handleError(err);
			res.json({status: 'Запись успешно обновлена'});
		});
	});


});
/*
router.post('/', (req, res) => {

	const Model = mongoose.model('skills');
	const id = 'ObjectId("58c77dd226f8697d2c233ace")';

	const item = new Model({
		HTML5: req.body.HTML5,
		CSS3: req.body.CSS3,
		Js_Jquery: req.body.Js_Jquery,
		PHP: req.body.PHP,
		mySQL: req.body.mySQL,
		Node_npm: req.body.Node_npm,
		Mongodb: req.body.Mongodb,
		Git: req.body.Git,
		Gulp: req.body.Gulp,
		Bower: req.body.Bower
	});

	item.save().then(skills => {
		Model.update({_id: id}, {
			$set: {
				HTML5: req.body.HTML5,
				CSS3: req.body.CSS3,
				Js_Jquery: req.body.Js_Jquery,
				PHP: req.body.PHP,
				mySQL: req.body.mySQL,
				Node_npm: req.body.Node_npm,
				Mongodb: req.body.Mongodb,
				Git: req.body.Git,
				Gulp: req.body.Gulp,
				Bower: req.body.Bower
			}
		}, {upsert: true})
			.then(
				i => res.json({status: 'Запись успешно добавлена'}),
				e => res.json({status: e.message})
			);
	});
});
*/


module.exports = router;