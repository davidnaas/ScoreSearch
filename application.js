var KEY = 'wJ2iFrHPZwnGx5JFrDyqWUeqXcQFpntY';
var SECRET = '5qwhykNb8kfb3KDceUWEHtpmo5zFb4XY';

$(document).ready(function() {
	
	$('#searchform').submit(function (evt) {
		evt.preventDefault();

		searchCriteria = evt.currentTarget.children[0].value;

		$('#searchform').fadeOut('slow', function() {
			
		});

		url = 'http://api.musescore.com/services/rest/score.json&oauth_consumer_key='+ KEY + '&oauth_consumer_secret='+ SECRET + '&text=' +	searchCriteria;	

		$.get(url, function(data) {
			$('body').append(
					"<div class=\"space-frame\" data-enter=\"fadeIn slideInBottom\" data-exit=\"fadeOut zoomOut\" data-duration=\"2\"><section class=\"space-inner-frame\"><p class=\"searchHeader\">"+ searchCriteria +"</p></section></div>"
			);


			for(var i = 0; i < data.length; i++){
				score = data[i];
				appendSpaceFrame(score.id, score.secret);
			}


			//TODO Add option to load next page
			$('body').append(
					"<div class=\"space-frame\" data-enter=\"fadeIn slideInBottom\" data-exit=\"fadeOut zoomOut\" data-duration=\"2\"><section class=\"space-inner-frame\"></section></div>"
			);
		});
		

	});

	function appendSpaceFrame (id, secret) {
		baseURL = 'http://static.musescore.com/'+id+'/'+secret+'/';

		audioURL = baseURL + 'score.mp3';
		imageURL = baseURL + 'score_0.png';

		$('body').append(
					"<div class=\"space-frame\" data-enter=\"fadeIn slideInBottom\" data-exit=\"fadeOut zoomOut\" data-duration=\"2\"><section class=\"space-inner-frame\"><img src=\""+imageURL+"\"><audio class=\"audioplayer\" src=\""+audioURL+"\" preload=\"auto\" autoplay loop></audio></section></div>"
		);

		initframes = $('.space-frame')

	

		$.getScript("spacemod.js", function(){

		});

		//set start volume to zero
		for(i = 1; i < initframes.length; i++ ){
			opacity = $(initframes[i]).css('opacity');
			audio = $(initframes[i]).find(".audioplayer");
			audio[0].volume = 0;
		}

	}

});

