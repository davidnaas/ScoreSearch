var KEY = 'wJ2iFrHPZwnGx5JFrDyqWUeqXcQFpntY';
var SECRET = '5qwhykNb8kfb3KDceUWEHtpmo5zFb4XY';
var url;
var currentPage = 0;
var searchCriteria;

$(document).ready(function() {
	
	$('#searchform').submit(function (evt) {
		evt.preventDefault();

		searchCriteria = evt.currentTarget.children[0].value;

		$('#searchform').fadeOut('slow', function() {
			evt.currentTarget.children[0].value = '';
		});

		url = createSearchURL(searchCriteria, currentPage);
		currentPage++;


		$('.spacediv').append(
			"<div class=\"space-frame\" data-enter=\"\" data-exit=\"\" data-duration=\"0.1\"><section class=\"space-inner-frame\"><p class=\"searchHeader\">"+ searchCriteria +"</p></section></div>"
		);

		getScores(url);
		$('body').prepend('<i class="fa fa-2x fa-search"></i>');


	});

	$('*').on('click', 'i.fa', function(event) {
		console.log(event.currentTarget.className);
		var classname = event.currentTarget.className;
		if ( classname === 'fa fa-star-o'){
			$(event.currentTarget).removeClass('fa-star-o')
			$(event.currentTarget).addClass('fa-star');
		}else if(classname === 'fa fa-2x fa-search'){
			$('.space-frame').remove();
			$('body').css('height', '100vh');
			$('.fa-search').animate({
					opacity: 0,
				}, 2000, function() {
					// Animation complete.
			});
			$('#searchform').fadeIn('slow', function() {
			});
		}else if(classname === 'fa fa-2x fa-plus'){
			$('.plusFrame').fadeOut('slow', function() {
				this.remove();
				loadNextPage();
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

	function appendPlusFrame() {
		//TODO Add option to load next page
		$('.spacediv').append(
				"<div class=\"space-frame plusFrame\" data-enter=\"fadeIn slideInBottom\" data-exit=\"fadeOut zoomOut\" data-duration=\"2\"><section class=\"space-inner-frame\"><i class=\"fa fa-2x fa-plus\"></i></section></div>"
		);
	}

	function loadNextPage () {
		getScores(createSearchURL(searchCriteria, currentPage));
		SpaceController().init();
		currentPage++;
	}

	function createSearchURL (search, page) {
		return 'http://api.musescore.com/services/rest/score.json&oauth_consumer_key='+ KEY + '&oauth_consumer_secret='+ SECRET + '&text=' + search + '&page=' + page;
	}

	function getScores (getURL) {
		$.get(getURL, function(data) {

			for(var i = 0; i < data.length; i++){
				score = data[i];
				appendSpaceFrame(score.id, score.secret);
			}

			appendPlusFrame();

			//Only load first time
			if($('script').length < 3){
				$.getScript("spacemod.js", function(){

				});
			}

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

			$('p').animate({
					opacity: 1,
				}, 2000, function() {
					// Animation complete.
			});

			//set start volume to zero
			var spaceframes = $('.space-frame')

			for(i = 1; i < spaceframes.length -1; i++ ){
				audio = $(spaceframes[i]).find(".audioplayer");
				audio[0].volume = 0;
			}
		});
	}

});

