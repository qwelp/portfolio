var circle = (function () {

	var radius = 45;

	var procent100 = function(summ) {
		return 2 * summ * 3.1415;
	};
	var procent = function(p, summ) {
		return procent100(summ) * (100-p) / 100;
	};

	var animate = function () {

		$(".sector").css({
			"stroke-dasharray": procent100(radius),
			"stroke-dashoffset": procent100(radius)
		});

		setTimeout(function(){
			$(".sector").each(function(){
				$(this)
					.attr('data-procent', $(this).data('procent'))
					.attr('stroke-dasharray', procent100(radius))
					.attr('stroke-dashoffset', procent100(radius))
					.css("stroke-dashoffset", procent($(this).data('procent'), radius))
					.css('stroke', '#74a163')
					.css('opacity', '.' + $(this).data('procent'));
			});
		}, 300);
	};

	return {
		init : function () {
			animate();
		}
	}
}());

$(function () {
	circle.init();
});