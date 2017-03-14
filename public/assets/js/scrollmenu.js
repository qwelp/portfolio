'use strict';

var scrollmenu = (function () {
	var $news = $('.news'),
		$item = $('.menu__item'),
		$wrapMenu = $('.wrap-menu'),
		body = document.body,
		isPositionArticle = [],
		offsetHeight = 200,

		positionArticle = function (element) {
			var len = element.length;
			for (var i = 0; i < len; i++) {
				isPositionArticle[i] = {};
				isPositionArticle[i].top = element
						.eq(i)
						.offset()
						.top - offsetHeight;
				isPositionArticle[i].bottom = isPositionArticle[i].top + element
						.eq(i)
						.innerHeight();
			}
		},

		scrollPageFixMenu = function (e) {
			var scroll = window.pageYOffset;
			if (scroll < $news.offset().top) {
				$wrapMenu.removeClass('fixed');
			} else {
				if(window.innerWidth > 768) {
					$wrapMenu.addClass('fixed');
				} else {
					$wrapMenu.removeClass('fixed');
				}
			}
		},

		scrollPage = function (e) {
			var scroll = window.pageYOffset;
			for (var i = 0; i < isPositionArticle.length; i++) {
				if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
					$item
						.eq(i)
						.addClass('menu__item--active')
						.siblings()
						.removeClass('menu__item--active');
				}
				if(isPositionArticle.length-1 == i){
					if($('.menu').is('.menu__item--active')){
						$('.menu').removeClass('menu__item--active');
					}
				}
			}
		},

		clickOnMenu = function (e) {
			var index = $(e.target).index();
			var sectionOffset = $news
				.eq(index)
				.offset()
				.top;
			$(document).off('scroll', scrollPage);
			$('body, html').animate({
				'scrollTop': sectionOffset
			}, function () {
				$(e.target)
					.addClass('menu__item--active')
					.siblings()
					.removeClass('menu__item--active');
				$(document).on('scroll', scrollPage);
			});

			if(window.innerWidth <= 768) {
				var menu = $(".wrap-menu"),
					news = $(".l-blog__col_right");

				menu.animate({"left": "-81%"}, 300);
				news.animate({"left": 0}, 300);
			}
		},

		addListener = function () {
			$('.menu').on('click', clickOnMenu);

			$(document).on('scroll', scrollPage);
			$(document).on('scroll', scrollPageFixMenu);

			$(window).on('load', function (e) {
				positionArticle($news);
			});

			$(window).on('resize', function (e) {
				positionArticle($news);
			});
		};

	return {
		init: function () {
			addListener();
		}
	}
}());

$(function () {
	if($('.menu').length){
		scrollmenu.init();

		$(".wrap-menu__table").on("click", function(e){
			e.preventDefault();
			var menu = $(".wrap-menu"),
				news = $(".l-blog__col_right");
			if(menu.css("left") == "0px"){
				menu.animate({"left": "-81%"}, 300);
				news.animate({"left": 0}, 300);
			} else {
				menu.animate({"left": '0'}, 300);
				news.animate({"left": "86%"}, 300);
			}
		});
	}
});


$(window).resize(function () {

	if($('.menu').length){
		if(window.innerWidth >= 768) {
			$(".l-blog__col_right").attr("style", "");
			$(".wrap-menu").attr("style", "");
		}
	}
});