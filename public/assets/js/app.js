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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0JCgnI3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKFwiaHRtbCxib2R5XCIpLmNzcyhcIm92ZXJmbG93XCIsXCJhdXRvXCIpO1xuXHRcdCQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0fSk7XG5cblx0aWYgKCQoJy5jLWFycm93JykubGVuZ3RoKSB7XG5cdFx0c3JvbGxFbGVtZW50LmluaXQoKTtcblx0fVxuXG5cdGlmICgkKCcuYWRtaW4tdGFicycpLmxlbmd0aCkge1xuXHRcdHRhYnNBZG1pbi5pbml0KCk7XG5cdH1cblxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiI2pzX2Nsb3NlX19tc2dcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0JChcIi5hZG1pbi1jaGVja1wiKS5oaWRlKCk7XG5cdH0pO1xufSk7XG5cbnZhciBzcm9sbEVsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuXG5cdHZhciBlbGVtZW50ID0gZnVuY3Rpb24gKGxpbmssIGVsZW1lbnQpIHtcblx0XHQkKGxpbmspLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wfSwgNTAwKTtcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGVsZW1lbnQoJy5jLWFycm93JywgJyNqcy1zY3JvbGwtaW5mbycpO1xuXHRcdH1cblx0fVxufSgpKTtcblxudmFyIHRhYnNBZG1pbiA9IChmdW5jdGlvbiAoKSB7XG5cblx0dmFyIHRhYnMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG5cdFx0dmFyIGl0ZW1zID0gJCgnLmFkbWluLXRhYnMnKSxcblx0XHRcdGl0ZW0gPSBpdGVtcy5maW5kKCcuYWRtaW4tdGFiJyksXG5cdFx0XHRtZW51ID0gJCgnLmFkbWluLW1lbnVfX2l0ZW1zJyksXG5cdFx0XHRtZW51SXRlbSA9IG1lbnUuZmluZCgnLmFkbWluLW1lbnVfX2l0ZW0nKSxcblx0XHRcdG5keCA9IGVsZW1lbnQucGFyZW50KCkuaW5kZXgoKTtcblxuXHRcdGl0ZW0uZXEobmR4KVxuXHRcdFx0LmFkZChtZW51SXRlbS5lcShuZHgpKVxuXHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKVxuXHRcdFx0LnNpYmxpbmdzKClcblx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcuYWRtaW4tbWVudV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dGFicygkKHRoaXMpKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSgpKTtcblxuLyogTk9ERSAqL1xuXG5jb25zdCBmb3JtVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCcpO1xuXG5mdW5jdGlvbiBmaWxlVXBsb2FkKHVybCwgZGF0YSwgY2IpIHtcblx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG5cblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0Y2IocmVzdWx0LnN0YXR1cyk7XG5cdH07XG5cblx0eGhyLnNlbmQoZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kRmlsZShlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXG5cblx0bGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXNfdXBsb2FkJyk7XG5cblx0bGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdGxldCBmaWxlID0gZG9jdW1lbnRcblx0XHQucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0Jylcblx0XHQuZmlsZXNbMF07XG5cdGxldCBuYW1lID0gZG9jdW1lbnRcblx0XHQucXVlcnlTZWxlY3RvcignI2ZpbGUtZGVzYycpXG5cdFx0LnZhbHVlO1xuXHRsZXQgdGVjaCA9IGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXRlY2gnKVxuXHRcdC52YWx1ZTtcblx0bGV0IHVybCA9IGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXVybCcpXG5cdFx0LnZhbHVlO1xuXG5cdGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpO1xuXHRmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTtcblx0Zm9ybURhdGEuYXBwZW5kKCd0ZWNoJywgdGVjaCk7XG5cdGZvcm1EYXRhLmFwcGVuZCgndXJsJywgdXJsKTtcblxuXHRyZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1VwbG9hZGluZy4uLic7XG5cdGZpbGVVcGxvYWQoJy9hZG1pbicsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRtaW4tY2hlY2tcIikuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJykucmVzZXQoKTtcblx0fSk7XG5cbn1cblxuaWYgKGZvcm1VcGxvYWQpIHtcblxuXHRmb3JtVXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kRmlsZSk7XG59XG5cbi8vLS0tLS0tLS0tLS0tIGJsb2NrIG1haWxcbmNvbnN0IGZvcm1NYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcblxuaWYgKGZvcm1NYWlsKSB7XG5cdGZvcm1NYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kTWFpbCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0bGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXNfbWFpbCcpO1xuXHRsZXQgZGF0YSA9IHtcblx0XHRuYW1lOiBmb3JtTWFpbC5uYW1lLnZhbHVlLFxuXHRcdGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcblx0XHR0ZXh0OiBmb3JtTWFpbC50ZXh0LnZhbHVlXG5cdH07XG5cdHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG5cdHNlbmRNYWlsRGF0YSgnL3dvcmtzX21haWwnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuXHRcdGZvcm1NYWlsLnJlc2V0KCk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kTWFpbERhdGEodXJsLCBkYXRhLCBjYikge1xuXHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcblx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cdHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdGNiKHJlc3VsdC5zdGF0dXMpO1xuXHR9O1xuXHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbmZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XG5cdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuXHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0Y2IocmVzdWx0LnN0YXR1cyk7XG5cdH07XG5cdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn1cbmZ1bmN0aW9uIHNlbmRBamF4SnNvblB1dCh1cmwsIGRhdGEsIGNiKSB7XG5cdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9wZW4oJ1BVVCcsIHVybCwgdHJ1ZSk7XG5cdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXHR4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcblx0XHRsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRjYihyZXN1bHQuc3RhdHVzKTtcblx0fTtcblx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG4vKiBCTE9HICovXG5cbmNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcblxuaWYgKGZvcm1CbG9nKSB7XG5cdGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0bGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXNfYmxvZycpO1xuXHRsZXQgZGF0YSA9IHtcblx0XHR0aXRsZTogZm9ybUJsb2cudGl0bGUudmFsdWUsXG5cdFx0ZGF0ZTogZm9ybUJsb2cuZGF0ZS52YWx1ZSxcblx0XHR0ZXh0OiBmb3JtQmxvZy50ZXh0LnZhbHVlXG5cdH07XG5cdHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG5cdHNlbmRBamF4SnNvbignL2FkbWluX2Jsb2cnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRtaW4tY2hlY2tcIikuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRmb3JtQmxvZy5yZXNldCgpO1xuXHR9KTtcbn1cblxuLyogU0tJTExTICovXG5cblxuY29uc3QgZm9ybVNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNza2lsbHMnKTtcblxuaWYgKGZvcm1Ta2lsbHMpIHtcblx0Zm9ybVNraWxscy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFNraWxscyk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kU2tpbGxzKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1c19za2lsbHMnKTtcblx0bGV0IGRhdGEgPSB7XG5cdFx0SFRNTDU6IGZvcm1Ta2lsbHMuSFRNTDUudmFsdWUsXG5cdFx0Q1NTMzogZm9ybVNraWxscy5DU1MzLnZhbHVlLFxuXHRcdEpzX0pxdWVyeTogZm9ybVNraWxscy5Kc19KcXVlcnkudmFsdWUsXG5cdFx0UEhQOiBmb3JtU2tpbGxzLlBIUC52YWx1ZSxcblx0XHRteVNRTDogZm9ybVNraWxscy5teVNRTC52YWx1ZSxcblx0XHROb2RlX25wbTogZm9ybVNraWxscy5Ob2RlX25wbS52YWx1ZSxcblx0XHRNb25nb2RiOiBmb3JtU2tpbGxzLk1vbmdvZGIudmFsdWUsXG5cdFx0R2l0OiBmb3JtU2tpbGxzLkdpdC52YWx1ZSxcblx0XHRHdWxwOiBmb3JtU2tpbGxzLkd1bHAudmFsdWUsXG5cdFx0Qm93ZXI6IGZvcm1Ta2lsbHMuQm93ZXIudmFsdWVcblx0fTtcblx0cmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcblx0c2VuZEFqYXhKc29uUHV0KCcvYWRtaW5fc2tpbGxzJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRyZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkbWluLWNoZWNrXCIpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdH0pO1xufVxuXG5cbi8qIExPR0lOICovXG5cbmNvbnN0IGZvcm1Mb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpO1xuXG5pZiAoZm9ybUxvZ2luKSB7XG5cdGZvcm1Mb2dpbi5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlQXV0aCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVBdXRoKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuXHRsZXQgZGF0YSA9IHtcblx0XHRsb2dpbjogZm9ybUxvZ2luLmxvZ2luLnZhbHVlLFxuXHRcdHBhc3N3b3JkOiBmb3JtTG9naW4ucGFzc3dvcmQudmFsdWVcblx0fTtcblx0cmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcblx0c2VuZEFqYXhKc29uKCcvJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRyZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcblx0fSk7XG59Il19
