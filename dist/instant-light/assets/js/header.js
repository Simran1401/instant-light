jQuery("document").ready(function ($) {
	var nav = $('.upper-nav');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 36) {
			nav.addClass("hide-upper-nav");
		} else {
			nav.removeClass("hide-upper-nav");
		}
	});
});
jQuery("document").ready(function ($) {
	var nav = $('.lower-nav');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 36) {
			nav.addClass("fixed-lower-nav");
		} else {
			nav.removeClass("fixed-lower-nav");
		}
	});
});

jQuery("document").ready(function ($) {
	var nav = $('.sections');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 36) {
			nav.addClass("section-pad");
		} else {
			nav.removeClass("section-pad");
		}
	});
});

