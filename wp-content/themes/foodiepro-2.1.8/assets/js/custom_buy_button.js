var edison = edison || {};


;(function ($, edison) {
	"use strict";


	function init() {
		$(".edison-buy-button").each(function() {
			var buybutton = new edison.BuyButton({ container: this });
		});
	}

    $(function () {
        init();
    });

}(jQuery, edison));

(function ($, edison, win) {
	"use strict";

	edison.BuyButton = function (objectConfiguration) {
		var defaults = {
				productUrl: win.location.href
			},
			configuration = $.extend(defaults, objectConfiguration),
			dom = {};

		function init() {
			dom.container = $(configuration.container);
			dom.button = dom.container.find(".edison-buy-button__btn");

			window.console.log(configuration.productUrl);

			dom.button.on("click", function() {
				window.console.log($(this));
			});
		}

		init();
		return this;
	};

}(jQuery, edison, window));
