'use strict';

$(document).ready(function () {
	$('#toggle').click(function () {
		$(this).toggleClass('active');
		$("html,body").css("overflow","auto");
		$('#overlay').toggleClass('open');
	});

	if ($('.c-arrow').length) {
		srollElement.init();
	}

	if ($('.admin-tabs').length) {
		tabsAdmin.init();
	}

	$("body").on("click", "#js_close__msg", function (e) {
		e.preventDefault();
		$(".admin-check").hide();
	});
});

var srollElement = (function () {

	var element = function (link, element) {
		$(link).on("click", function (e) {
			e.preventDefault();
			$('html, body').animate({scrollTop: $(element).offset().top}, 500);
		});
	};

	return {
		init: function () {
			element('.c-arrow', '#js-scroll-info');
		}
	}
}());

var tabsAdmin = (function () {

	var tabs = function (element) {

		var items = $('.admin-tabs'),
			item = items.find('.admin-tab'),
			menu = $('.admin-menu__items'),
			menuItem = menu.find('.admin-menu__item'),
			ndx = element.parent().index();

		item.eq(ndx)
			.add(menuItem.eq(ndx))
			.addClass('active')
			.siblings()
			.removeClass('active');
	};

	return {
		init: function () {
			$('.admin-menu__link').on('click', function (e) {
				e.preventDefault();
				tabs($(this));
			});
		}
	}
}());

/* NODE */

const formUpload = document.querySelector('#upload');

function fileUpload(url, data, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);

	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText);
		cb(result.status);
	};

	xhr.send(data);
}

function prepareSendFile(e) {
	e.preventDefault();



	let resultContainer = document.querySelector('.status_upload');

	let formData = new FormData();
	let file = document
		.querySelector('#file-select')
		.files[0];
	let name = document
		.querySelector('#file-desc')
		.value;
	let tech = document
		.querySelector('#file-tech')
		.value;
	let url = document
		.querySelector('#file-url')
		.value;

	formData.append('photo', file, file.name);
	formData.append('name', name);
	formData.append('tech', tech);
	formData.append('url', url);

	resultContainer.innerHTML = 'Uploading...';
	fileUpload('/admin', formData, function (data) {
		resultContainer.innerHTML = data;
		document.querySelector(".admin-check").style.display = 'flex';
		document.querySelector('#upload').reset();
	});

}

if (formUpload) {

	formUpload.addEventListener('submit', prepareSendFile);
}

//------------ block mail
const formMail = document.querySelector('#mail');

if (formMail) {
	formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
	e.preventDefault();
	let resultContainer = document.querySelector('.status_mail');
	let data = {
		name: formMail.name.value,
		email: formMail.email.value,
		text: formMail.text.value
	};
	resultContainer.innerHTML = 'Sending...';
	sendMailData('/works_mail', data, function (data) {
		resultContainer.innerHTML = data;
		formMail.reset();
	});
}

function sendMailData(url, data, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText);
		cb(result.status);
	};
	xhr.send(JSON.stringify(data));
}

function sendAjaxJson(url, data, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText);
		cb(result.status);
	};
	xhr.send(JSON.stringify(data));
}
function sendAjaxJsonPut(url, data, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText);
		cb(result.status);
	};
	xhr.send(JSON.stringify(data));
}

/* BLOG */

const formBlog = document.querySelector('#blog');

if (formBlog) {
	formBlog.addEventListener('submit', prepareSendPost);
}

function prepareSendPost(e) {
	e.preventDefault();
	let resultContainer = document.querySelector('.status_blog');
	let data = {
		title: formBlog.title.value,
		date: formBlog.date.value,
		text: formBlog.text.value
	};
	resultContainer.innerHTML = 'Sending...';
	sendAjaxJson('/admin_blog', data, function (data) {
		resultContainer.innerHTML = data;
		document.querySelector(".admin-check").style.display = 'flex';
		formBlog.reset();
	});
}

/* SKILLS */


const formSkills = document.querySelector('#skills');

if (formSkills) {
	formSkills.addEventListener('submit', prepareSendSkills);
}

function prepareSendSkills(e) {
	e.preventDefault();
	let resultContainer = document.querySelector('.status_skills');
	let data = {
		HTML5: formSkills.HTML5.value,
		CSS3: formSkills.CSS3.value,
		Js_Jquery: formSkills.Js_Jquery.value,
		PHP: formSkills.PHP.value,
		mySQL: formSkills.mySQL.value,
		Node_npm: formSkills.Node_npm.value,
		Mongodb: formSkills.Mongodb.value,
		Git: formSkills.Git.value,
		Gulp: formSkills.Gulp.value,
		Bower: formSkills.Bower.value
	};
	resultContainer.innerHTML = 'Sending...';
	sendAjaxJsonPut('/admin_skills', data, function (data) {
		console.log(data);
		resultContainer.innerHTML = data;
		document.querySelector(".admin-check").style.display = 'flex';
	});
}


/* LOGIN */

const formLogin = document.querySelector('#login');

if (formLogin) {
	formLogin.addEventListener('submit', prepareAuth);
}

function prepareAuth(e) {
	e.preventDefault();
	let resultContainer = document.querySelector('.status');
	let data = {
		login: formLogin.login.value,
		password: formLogin.password.value
	};
	resultContainer.innerHTML = 'Sending...';
	sendAjaxJson('/', data, function (data) {
		resultContainer.innerHTML = data;
	});
}