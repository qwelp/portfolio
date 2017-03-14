var flip = (function () {

	var flipAut = function () {
		var flipContainer = $(".flip-container"),
			linkFlip = $("#js-aut-flip");

		if (flipContainer.is(".hover")) {
			flipContainer.removeClass("hover");
			linkFlip.addClass("visible").removeClass("hidden");
		} else {
			flipContainer.addClass("hover");
			linkFlip.removeClass("visible").addClass("hidden");
		}
	};

	return {
		init: function () {
			$('body').on('click', '.js-aut-flip', function (e) {
				e.preventDefault();
				flipAut();
			});
		}
	}
}());

$(function () {
	if ($(".js-aut-flip").length) {
		flip.init();
	}
});