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
				productUrl: win.location.href,
				siteUrl: win.location.protocol + "//" + win.location.hostname + (win.location.host === "localhost" ? win.location.pathname : '/'),
				currentState: false,
				className: "edison-scroll-lock",
				currentWindowScrollPositionX: 0,
				currentWindowScrollPositionY: 0,
				scrollTop: 0
			},
			configuration = $.extend(defaults, objectConfiguration),
			dom = {};

		function getScrollPosition() {
			configuration.currentWindowScrollPositionX = (window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0);
			configuration.currentWindowScrollPositionY = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
		}

		function enableScrollLock() {
			if (!configuration.currentState) {
				// Get scroll position
				getScrollPosition();
				configuration.scrollTop = configuration.currentWindowScrollPositionY;

				// Reset scroll position
				window.scrollTo(configuration.currentWindowScrollPositionX, 0);

				var htmlTag = document.documentElement;
				htmlTag.classList.add(configuration.className);
				htmlTag.style.marginTop = 0 + "px";
				//htmlTag.style.position = "fixed";
				htmlTag.style.overflow = "hidden";
				htmlTag.style.width = "100%";

				// Remember state
				configuration.currentState = true;
			}
		}

		function disableScrollLock() {
			if (configuration.currentState) {

				var htmlTag = document.documentElement;
				htmlTag.classList.remove(configuration.className);
				htmlTag.style.marginTop = "";
				//htmlTag.style.position = "";
				htmlTag.style.overflow = "";
				htmlTag.style.width = "";

				// Set the scroll position to what it was before
				window.scrollTo(configuration.currentWindowScrollPositionX, configuration.scrollTop);

				// Remember state
				configuration.currentState = false;
			}
		}

		function toggleScrollLock() {
			if (configuration.currentState) {
				disableScrollLock();
			} else {
				enableScrollLock();
			}
		}

		function send(formData) {
			var request = $.ajax({
				url: dom.form.attr('action'),
				method: "POST",
				data: formData
			});

			request.done(function (data) {
				setTimeout(function () {
					dom.sendbutton.hide();
					dom.formSuccess.show();
				}, 200);
			});

			request.fail(function () {
				window.console.log("error");
			});
		}

		function createForm() {

			var return_string = '<form action="' + configuration.siteUrl + 'sendmail.php" method="post" class="edison-buy-button__form">';
				return_string += '<button type="button" class="edison-buy-button__close">Luk</button>';
				return_string += '<input type="hidden" name="url" value="' + configuration.productUrl + '"/>';
				return_string += '<p class="edison-buy-button__manchet">Hej<br/>Udfyld felterne og så venter jeg tilbage.</p>';
				return_string += '<label>';
				return_string += '<span>Navn</span>';
				return_string += '<input type="text" name="name"/>';
				return_string += '<span>Skriv venligst dit navn</span>';
				return_string += '</label>';
				return_string += '<label>';
				return_string += '<span>E-mail</span>';
				return_string += '<input type="text" name="email"/>';
				return_string += '<span>Skriv venligst din email</span>';
				return_string += '</label>';
				return_string += '<label>';
				return_string += '<span>Bemærkninger</span>';
				return_string += '<textarea name="message"></textarea>';
				return_string += '</label>';
				return_string += '<button type="submit" class="edison-buy-button__send">Send</button>';
				return_string += '<p class="edison-buy-button__success">Tak for bestillingen. Jeg vender tilbage så hurtigt jeg kan.</p>';
				return_string += '</form>';

			return $(return_string);
		}

		function createOverlay() {
			var return_string = '<div class="edison-buy-button__overlay">';
				return_string += '</div>';

			return $(return_string);
		}

		function removeOverlay() {
			toggleScrollLock();
			dom.overlay.hide();
			dom.form.hide();
		}

		function initForm() {
			dom.form = createForm().hide();
			dom.close = dom.form.find(".edison-buy-button__close");
			dom.sendbutton = dom.form.find(".edison-buy-button__send");
			dom.formName = dom.form.find('[name="name"]');
			dom.formEmail = dom.form.find('[name="email"]');
			dom.formSuccess = dom.form.find(".edison-buy-button__success");

			dom.container.append(dom.form);
			dom.container.append(dom.overlay);

			dom.overlay.show();
			dom.form.show();

			dom.overlay.on("click", function(e) {
				removeOverlay();
			});

			dom.form.on("submit", function(e) {
				e.preventDefault();
			});

			dom.close.on("click", function(e) {
				removeOverlay();
			});

			dom.formName.on("focus", function() {
				dom.formName.removeClass("error");
			});

			dom.formEmail.on("focus", function() {
				dom.formEmail.removeClass("error");
			});

			dom.sendbutton.on("click", function(e) {
				e.preventDefault();
				var formData = dom.form.serialize();

				if(dom.formName.val() === "") {
					dom.formName.addClass("error");
				}

				if(dom.formEmail.val() === "") {
					dom.formEmail.addClass("error");
				}

				if(dom.formName.val() !== "" && dom.formEmail.val() !== "") {
					send(formData);
				}
			});
		}

		function init() {
			dom.container = $(configuration.container);
			dom.overlay = createOverlay().hide();
			dom.buybutton = dom.container.find(".edison-buy-button__btn");

			dom.buybutton.on("click", function(e) {
				e.preventDefault();
				toggleScrollLock();

				if(dom.form) {
					dom.form.remove();
					initForm();
				} else {
					initForm();
				}
			});

		}

		init();
		return this;
	};

}(jQuery, edison, window));
