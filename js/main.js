
$(function(){
	var win_width = window.innerWidth,
		win_height = window.innerHeight;
		
	/* reset */
	$(window).on('load resize', function(){

		$('.section').height(win_height);		
		$('.section').css({'min-height' : win_height });	
		
		lnb();
		// 높이값 긴것에 마주기 - section4 scratch_list
		function lnb() {
			var $LnbList = $(".scratch_list > li");
			var LnbArray = $LnbList.map(function(){
			return $(this).outerHeight();
			})
			//console.log(Math.max.apply(Math , LnbArray));

			$(".scratch_list > li").css({"height":Math.max.apply(Math , LnbArray)});
		}
		//console.log($(".scratch_list > li").outerHeight());

	});

	$(window).load(function(){
		$('body,html').stop().animate({ 'scrollTop' : 0 }, 800, 'easeInOutSine');
		
		scrollDisable();
		setTimeout(scrollAble, 5500);

		setTimeout(function() {
		  $(".shutter").css({'z-index' : '-1' , 'display' :  'none'});
		  $(".loading_wrap").fadeOut(400);
		}, 1500);

	});

	
	function scrollDisable(){
		$('body').addClass('scrollDisable').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
		});
	}
	function scrollAble(){
		$('body').removeClass('scrollDisable').off('scroll touchmove mousewheel');
	}


	/* ie-alert */
	$(".ie_alert .close_btn").click(function(){
		$(".ie_alert").fadeOut(400);
	});
	


	/* section2 - skill_list Click Event */
	$(".section2 .view_more").each(function(i){
		$except = $(this);
		$(this).on({
			click: function(){

				$(this).parent('.each_box').toggleClass('on');
				$(this).children('.tit').toggleClass('on');
				$(this).children('.after_click').toggleClass('on');
				$(this).next('.txt_wrap').toggleClass('on');
				$(this).children('.after_click').children('.num').toggleClass('animated jello');				

				return false;
			}
		});		
	});
	$("body,html").click(function(){
		$(".section2 .view_more").parent('.each_box').removeClass('on');
		$(".section2 .view_more").children('.tit').removeClass('on');
		$(".section2 .view_more").children('.after_click').removeClass('on');
		$(".section2 .view_more").next('.txt_wrap').removeClass('on');
		$(".section2 .view_more").children('.after_click').children('.num').removeClass('animated jello');
	});


	/* section1 달 오브젝트 mouse parallax */
//	var currentX = '';
//	var currentY = '';
//	var movementConstant = 0.0055;
//	$(document).mousemove(function(e) {
//		if (currentX == '') currentX = e.pageX;
//		var xdiff = e.pageX - currentX;
//		currentX = e.pageX;
//		if (currentY == '') currentY = e.pageY;
//		var ydiff = e.pageY - currentY;
//		currentY = e.pageY;
//		$('.parallax div').each(function(i, el) {
//			var movement = (i + 1) * (xdiff * movementConstant);
//			var movementy = (i + 1) * (ydiff * movementConstant);
//			var newX = $(el).position().left + movement;
//			var newY = $(el).position().top + movementy;
//			$(el).css('left', newX + 'px');
//			$(el).css('top', newY + 'px');
//		});
//	});



	//section3  work_list_box marsony layout
	var msnry = new Masonry( '.grid', {
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true,
		gutter : 30,
		stagger: 30
		});
		imagesLoaded( '.grid' ).on( 'progress', function() {
		msnry.layout();
	});


	//section3 work_list_box
	$(".each_work").each(function(){
		$(this).mouseenter(function(){
			$(this).children(".brief_view_wrap").css({"display" : "flex"});
		});
		$(this).mouseleave(function(){
			$(this).children(".brief_view_wrap").css({"display" : "none"});
		});
	});

	//section3 type_box filtering
	var $grid = $(".section3 .grid");
    $grid.isotope({
        masonry: {
			itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
			percentPosition: true,
			gutter : 30,
			stagger: 30
        }        
    });
	$('.section3 .type_list li a').each(function(){
		$(this).on({
			click: function(){

				$('.section3 .type_list li a').removeClass('on');
				$(this).addClass('on');
				var filterValue = $(this).attr('data-filter');
				//console.log(i , filterValue);
				$grid.isotope({ filter: filterValue });

				return false;				
			}
		});
	});



	// section4 scratch off effect
	var $scratchList = $(".section4 .scratch_list > li");
	$scratchList.each(function(i){
		$(this).on({
			click: function(){

				if(i >= 1 && i <= 5){
					if(!$(".section4 .scratch_list > li").eq(i-1).hasClass('on')){
						alert('순서대로 진행해주세요!');
					}else{
						if(i == 5 && !$(".section4 .scratch_list > li").eq(5).hasClass('on')){
							$(".modal_box").fadeIn(0);
							$(".modal_wrap").addClass('on');
							$(".modal_wrap .txt").addClass('animated fadeInUp');
							$(".modal_wrap .btn_wrap").addClass('animated fadeIn');
							$("body").css({'overflow-y' : 'hidden'});

							return false;
						}else {
							$(this).addClass('on');
							$(this).children(".scratch_area").stop().animate({ 'width' : '0%' }, 600, 'easeInOutSine');
							$(this).children(".txt").stop().delay(300).animate({ 'top' : 0 , 'opacity' : 1 }, 600, 'easeInOutSine');
						}
					}
				}else if(i==0){
					$(this).children(".cursor").fadeOut(300);
					$(this).addClass('on');
					$(this).children(".scratch_area").stop().delay(100).animate({ 'width' : '0%' }, 600, 'easeInOutSine');
					$(this).children(".txt").stop().delay(300).animate({ 'top' : 0 , 'opacity' : 1 }, 600, 'easeInOutSine');
				}		

			}
		});
	});
	

	//modal_box yes_btn click event
	$(".modal_box .yes_btn").click(function(){
		$(".modal_wrap .inner").eq(0).fadeOut(300);
		$(".modal_wrap .inner").eq(1).delay(300).fadeIn(300);
		$(".modal_wrap .close_wrap").delay(300).fadeIn(300);
		$(".modal_wrap .close_wrap").stop().delay(300).animate({'opacity' : '1' , 'top' : '-20px'}, 300);
		$(".modal_wrap .contact_box a").addClass('animated fadeIn');
	});
	//modal_box close_btn click event
	$(".modal_box .close_btn").click(function(){
		$(".modal_wrap").removeClass('on');
		$(".modal_box").delay(300).fadeOut(300);
		$("body").css({'overflow-y' : 'auto'});                                                                       
		$scratchList.eq(5).children(".cursor").fadeOut(300);                                                                                      
		$scratchList.eq(5).addClass('on');                                                                                                                 
		$scratchList.eq(5).children(".scratch_area").stop().delay(100).animate({ 'width' : '0%' }, 600, 'easeInOutSine');
		$scratchList.eq(5).children(".txt").stop().delay(300).animate({ 'top' : 0 , 'opacity' : 1 }, 600, 'easeInOutSine');  
	});


	
 	

	


	
	//////////////////////////// ScrollMagic.js + GSAP ////////////////////////////

	// ScrollMagic Controller 생성
	var controller1 = new ScrollMagic.Controller();
	var controller2 = new ScrollMagic.Controller();
	var controller3 = new ScrollMagic.Controller();
	var controller4 = new ScrollMagic.Controller();
  

  	// Animation Object 생성

	//section1 달 오브젝트
	var tween1 = TweenMax.fromTo('#sec1_animate1', 1000, {
	  opacity:1, y: 0	}, {opacity: 0, y: win_height * (2.5/3)});

	//section1 인사말
	var tween1_2 = TweenMax.fromTo('#sec1_animate1_2', 100, {
	  opacity:1}, {opacity: 0});

	//scroll down indicator
	 var tween1_3 = TweenMax.to('#sec1_animate1_3', 100, {
		opacity: 0 , y: 0});

	//section2 bg_txt
	var tl1 = new TimelineMax();  
		tl1
		.from("#txt_ani1", 500, {opacity: 0, y: -50})
		.from("#txt_ani2", 500, {opacity: 0, y: 100});

	//section2 skill_list
	var tween2 = TweenMax.staggerFromTo(".skill_list .each_box", 0.5, {
		y: "100px", ease: Linear.easeNone}, {y: 0, ease: Linear.easeNone}, .1);




	// Scene Object를 생성
	// scene이 일어날 트리거를 지정 + duration 지정
	// Scene Object를 ScrollMaig Controller에 추가 + Animation Object를 Scene Object에 추가	
	var scene1 = new ScrollMagic.Scene({
		triggerElement: "#trigger1",
		duration: '150%'
	})
		.setTween(tween1)
		.addTo(controller1);
//		.addIndicators({
//			name: "1"
//		  });

	var scene1_2 = new ScrollMagic.Scene({
		triggerElement: "#trigger1",
		duration: win_height  * (2.5/3)
	})
		.setTween(tween1_2)
		.addTo(controller1);
//		.addIndicators({
//			name: "1"
//		  });

	var scene1_3 = new ScrollMagic.Scene({
		triggerElement: "#trigger1",
		duration: win_height  * (2.5/3)
	})
		.setTween(tween1_3)
		.addTo(controller1);
//		.addIndicators({
//			name: "1"
//		  });

	var scene2 = new ScrollMagic.Scene({
		triggerElement: "#trigger2",
		duration: win_height / 2,
			offset: -200 
	})
		.setTween(tl1)
		.addTo(controller2);
//		.addIndicators({
//			name: "2"
//		  });

	var scene3 = new ScrollMagic.Scene({
		triggerElement: "#trigger2",
		duration: "80%",
			offset: -200 
	})
		.setTween(tween2)
		.addTo(controller2);
//		.addIndicators({
//			name: "3"
//		  });





	

	



// 기기체크
//	function isMobile(){
//		var UserAgent = navigator.userAgent;
//		if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
//		{
//			return true;
//		}else{
//			return false;
//		}
//	}
//
//	if(isMobile())
//		{
//			alert("mobile");
//		}
//		else{
//			alert('pc');
//		}	
//	});

	



	

});
