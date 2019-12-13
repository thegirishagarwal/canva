(function($){
	'use strict';

	jQuery(document).ready(function($) {
		var windowWidth = $(window).outerWidth();

		$('.menu-nav ul li a').click(function(){

			$('.menu-nav ul li').removeClass('active');
			$(this).parent().addClass('active');

			var $thisOffset = $(this).offsetRelative('.menu-nav');
			$(this).parents('.menu-nav').find('.items-active .inner-active-items').css({
				opacity: '1',
				transform: 'translate3d(0px, '+$thisOffset.top+'px, 0px)'
			});

			$('.close-link').removeClass('closeTrue');

			var $dataMenu = $(this).data('menu');

			$('.menu-section').each(function(){
				var $thisId = $(this).attr('id');

				$('#side-navbar').addClass('open-sidebar');

				if( $thisId === $dataMenu ){
					$(this).prevAll('section').find('.menu-item-box').css({
						opacity: '0',
						transform: 'translate3d(0px, -40px, 0px)',
					}).addClass('thisHide');

					$(this).find('.menu-item-box').css({
						opacity: '1',
						transform: '',
					}).removeClass('thisHide');

					$(this).nextAll('section').find('.menu-item-box').css({
						opacity: '0',
						transform: 'translate3d(0px, 40px, 0px)',
					}).addClass('thisHide');
				}

				setTimeout(function(){
					$('.menu-section').find('.menu-item-box').addClass('thisOpened');
				},200);
			})
		})


		$('.menu-nav ul li a').each(function(){
			var $thisActive = $(this).parent().hasClass('active');
			var $thisOffset = $(this).offsetRelative('.menu-nav');
			if($thisActive){
				$(this).parents('.menu-nav').find('.items-active .inner-active-items').css({
					opacity: '1',
					transform: 'translate3d(0px, '+$thisOffset.top+'px, 0px)'
				});

				$('.close-link').removeClass('closeTrue');

				var $dataMenu = $(this).data('menu');

				$('.menu-section').each(function(){
					var $thisId = $(this).attr('id');

					$('#side-navbar').addClass('open-sidebar');

					if( $thisId === $dataMenu ){
						$(this).prevAll('section').find('.menu-item-box').css({
							opacity: '0',
							transform: 'translate3d(0px, -40px, 0px)',
						}).addClass('thisHide');

						$(this).find('.menu-item-box').css({
							opacity: '1',
							transform: '',
						}).removeClass('thisHide');

						$(this).nextAll('section').find('.menu-item-box').css({
							opacity: '0',
							transform: 'translate3d(0px, 40px, 0px)',
						}).addClass('thisHide');
					}

					setTimeout(function(){
						$('.menu-section').find('.menu-item-box').addClass('thisOpened');
					},200)
				})
			}
		});

		$('.close-link a').click(function(event) {
			event.preventDefault();
			$(this).parent().addClass('closeTrue');
			$('#side-navbar').removeClass('open-sidebar');

			$('.menu-nav ul li').each(function(){
				var $thisActive = $(this).hasClass('active');
				if($thisActive){
					$(this).removeClass('active');
				}
			})

			$('.items-active .inner-active-items').css({
				opacity: '0',
			});

			$('.menu-section .menu-item-box').each(function(){
				var $thisOpened = $(this).hasClass('thisOpened');

				if($thisOpened){
					$(this).removeClass('thisOpened');
				}
			})
		});

		$('.data-items-video video').mouseenter(function(event) {
			var $videoPlayer = $('.data-items-video video').get(0),
				$thisPlayer = $(this).get(0);

				$videoPlayer.pause();

				if($thisPlayer.paused == false){
					$thisPlayer.pause();
				}else{
					$thisPlayer.play();
				}

		});

		$('.c-slider').each(function(index, el) {
			var $thisId = $(this).attr('id');
			$(this).owlCarousel({
				items: items($thisId),
				margin: 5,
				nav: true,
				dots: false,
				navText: ['<span><img src="assets/images/slider-left.svg"></span>','<span><img src="assets/images/slider-right.svg"></span>'],
			});

			function items($thisId){
				if(windowWidth <= 575 && windowWidth >= 376){
					if($thisId == 'colorSlider'){
						return '7';
					}else{
						return '2'
					}
				}

				if(windowWidth <= 375 && windowWidth >= 341){
					if($thisId == 'colorSlider'){
						return '6';
					}else{
						return '2'
					}
				}

				if(windowWidth <= 340){
					if($thisId == 'colorSlider'){
						return '5';
					}else{
						return '2'
					}
				}

				if($thisId == 'colorSlider'){
					return '8';
				}else{
					return '3'
				}
			}
		});

		$('.cancel').click(function(){
			$(this).css({
				opacity: '',
				visibility: ''
			});
			$(this).parents('.search-input').find('[name="search_name"]').val('');
			$(this).parents('.fsearch').find('.search-data').hide();
		})


		$("[name='search_name']").keyup(function(event) {
			var $thisVal = $(this).val();
			if($thisVal != ''){
				$(this).parent().find('.cancel').css({
					opacity: '1',
					visibility: 'visible'
				});
			}
			if ($thisVal.length != 0) {
				$(this).parents('.fsearch').find(".search-data").show();
				filterrow($thisVal);
			}
			else{
				$(this).parents('.fsearch').find(".search-data").hide();
			}
		});

		$("[name='search_name']").on('focus',function(){
			$('.searching-bg').css({
				opacity: '1',
				visibility: 'visible',
			});
		})

		$("[name='search_name']").each(function(){
			var $thisVal = $(this).val();
			if($thisVal != ''){
				$(this).parent().find('.cancel').css({
					opacity: '1',
					visibility: 'visible'
				});
			}
		})

		$(document).click(function(e){
			var container = $(".fsearch");
			var sidebar = $('#side-navbar.open-sidebar');
			var showingBtn = $('.showing-btn');
			if(!container.is(e.target) && container.has(e.target).length === 0){
				$('.searching-bg').css({
					opacity: '',
					visibility: '',
				});
			}

		})

		if(windowWidth <= 575){
			$(document).click(function(e){
				if(!sidebar.is(e.target) && sidebar.has(e.target).length === 0 && !showingBtn.is(e.target) && showingBtn.has(e.target).length === 0){
					$('body').removeClass('sidebar-success');
					sidebar.removeClass('open-sidebar');
				}
			})
		}

		$('.grid-gallery').justifiedGallery({
			rowHeight: 100,
			margins: 10,
		});

		$(window).on('resize', function(){

			$('.grid-gallery').justifiedGallery({
				rowHeight: 100,
				margins: 10,
			});

			if(windowWidth <= 575){
				$('#side-navbar').each(function(index, el) {
					var $thisClass = $(this).hasClass('open-sidebar');
					if($thisClass){
						$('body').addClass('sidebar-success');
					}
				});
			}
		})

		if(windowWidth <= 575){
			$('#side-navbar').each(function(index, el) {
				var $thisClass = $(this).hasClass('open-sidebar');
				if($thisClass){
					$('body').addClass('sidebar-success');
				}
			});
		}


		$('.showing-btn').click(function(event) {
			$('body').addClass('sidebar-success');
			$('#side-navbar').addClass('open-sidebar');
		});

		function filterrow(query){
	        if (query == '') {
	            return false
	        }
	        query = query.toLowerCase();

	        $(".search-data ul li").each(function(element,value){
	            if( $(value).find('.search-name').text().toLowerCase().indexOf(query) >= 0 ){
	                $(value).removeClass("d-none");
	            }else{
	            	$(this).parents('.search-data').hide();
	                $(value).addClass("d-none");
	            }
	        })
	    }

	    $(".search-data ul li").click(function(event) {
	    	var searchVal = $(this).find('.search-name').text();
	    	$('.search-data').hide();
	    	$(this).parents('.fsearch').find('[name="search_name"]').val(searchVal);
	    	$('.searching-bg').css({
	    		opacity: '',
	    		visibility: ''
	    	});
	    });

	});


})(jQuery)