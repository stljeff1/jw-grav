(function($, window) {
  function scrollDebounce(runFn) {
    var timer;
    $(window).on('scroll', function() {
      clearTimeout(timer)
      timer = setTimeout(runFn, 50);
    });
  };

  $(function () {
        $('.email-link').attr('href', 'mailto:hire@jeffwilkerson.net').text('hire@jeffwilkerson.net');
        $('.nav-toggle').click(function(e) {
          e.preventDefault();
        });

        $('.toggle-btn').click(function(e) {
        		e.preventDefault();
        		var target = $(this).data('target');
        		$('#'+target).slideToggle();
   		});

      scrollDebounce(function() {
        if($(this).scrollTop() > 10)
          $('body').addClass('scrolling');
        else
          $('body').removeClass('scrolling');
      });
  });
})(jQuery, window);