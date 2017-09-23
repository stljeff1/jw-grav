
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
        });