//=require magnific-popup/dist/jquery.magnific-popup.min.js

(function($, window) {


		$(function() {
			console.log('go to bed');
			$('.project-thumbnail').magnificPopup({
				type: 'image',
				image: {
					verticalFit: true,
					titleSrc: function(item) {
						return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
					}
				},
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 300, // don't foget to change the duration also in CSS
					opener: function(element) {
						return element.find('img');
					}
				}
				
			});
		});

})(jQuery, window);