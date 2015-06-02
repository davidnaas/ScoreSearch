var KEY = 'wJ2iFrHPZwnGx5JFrDyqWUeqXcQFpntY';
var SECRET = '5qwhykNb8kfb3KDceUWEHtpmo5zFb4XY';

$(document).ready(function() {
	
	$('#searchform').submit(function (evt) {
		evt.preventDefault();

		searchCriteria = evt.currentTarget.children[0].value;

		$('#searchform').fadeOut('slow', function() {
			evt.currentTarget.children[0].value = '';
		});

		url = 'http://api.musescore.com/services/rest/score.json&oauth_consumer_key='+ KEY + '&oauth_consumer_secret='+ SECRET + '&text=' +	searchCriteria;	

		$.get(url, function(data) {
			$('.spacediv').append(
					"<div class=\"space-frame\" data-enter=\"\" data-exit=\"\" data-duration=\"0\"><section class=\"space-inner-frame\"><p class=\"searchHeader\">"+ searchCriteria +"</p></section></div>"
			);


			for(var i = 0; i < data.length; i++){
				score = data[i];
				appendSpaceFrame(score.id, score.secret);
			}


			//TODO Add option to load next page
			$('.spacediv').append(
					"<div class=\"space-frame\" data-enter=\"fadeIn slideInBottom\" data-exit=\"fadeOut zoomOut\" data-duration=\"2\"><section class=\"space-inner-frame\"><i class=\"fa fa-2x fa-plus\"></i></section></div>"
			);

			//load space.js
			$.getScript("spacemod.js", function(){

			});

			$('body').prepend('<i class="fa fa-search"></i>');

			$('img').animate({
					opacity: 1,
				}, 2000, function() {
					// Animation complete.
			});

			$('i').animate({
					opacity: 1,
				}, 2000, function() {
					// Animation complete.
			});



			//set start volume to zero
			var spaceframes = $('.space-frame')

			for(i = 1; i < spaceframes.length -1; i++ ){
				opacity = $(spaceframes[i]).css('opacity');
				audio = $(spaceframes[i]).find(".audioplayer");
				audio[0].volume = 0;
			}
		});
		

	});

	$('*').on('click', 'i.fa', function(event) {
		console.log(event.currentTarget.className);
		var classname = event.currentTarget.className;
		if ( classname === 'fa fa-star-o'){
			$(event.currentTarget).removeClass('fa-star-o')
			$(event.currentTarget).addClass('fa-star');
		}else if(classname === 'fa fa-search'){
			$('.space-frame').remove();
			$('body').css('height', '100vh');
			$('.fa-search').animate({
					opacity: 0,
				}, 2000, function() {
					// Animation complete.
			});
			$('#searchform').fadeIn('slow', function() {
		});
		}

	});


	function appendSpaceFrame (id, secret) {
		baseURL = 'http://static.musescore.com/'+id+'/'+secret+'/';

		audioURL = baseURL + 'score.mp3';
		imageURL = baseURL + 'score_0.png';
		pdfURL = baseURL + 'score.pdf'

		$('.spacediv').append(
					"<div class=\"space-frame\" data-enter=\"fadeIn slideInBottom\" data-exit=\"fadeOut zoomOut\" data-duration=\"2\"><section class=\"space-inner-frame\"><img src=\""+imageURL+"\"><a href=\""+pdfURL+"\"><i class=\"fa fa-file-pdf-o\"></i></a><i class=\"fa fa-star-o\"></i><audio class=\"audioplayer\" src=\""+audioURL+"\" preload=\"auto\" autoplay loop></audio></section></div>"
		);

	}

});

