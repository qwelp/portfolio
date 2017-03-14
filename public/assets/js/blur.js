var blur = (function () {

	var blurFeedback = function () {

		var section = document.querySelector(".l-feedback"),
			form = document.querySelector(".c-feedback"),
			formWidth = form.offsetWidth / 2,
			posTop = -form.offsetTop,
			posLeft = -(form.offsetLeft - formWidth),
			bg = document.querySelector(".c-feedback__blur"),
			bgCSS = bg.style;

		bgCSS.top = posTop + 'px';
		bgCSS.left = posLeft + 'px';
		bgCSS.width = section.offsetWidth + 'px';
		bgCSS.height = section.offsetHeight + 'px';
	};

	return {
		init: function () {
			blurFeedback();
		}
	}
}());

$(function () {
	if ($(".l-feedback").length) {
		blur.init();
	}
});

$(window).resize(function () {
	if ($(".l-feedback").length) {
		blur.init();
	}
});
