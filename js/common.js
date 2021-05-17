$(function(){
	var $gnb = $(".gnb"),
		$contents = $(".contents"),
		$header = $(".header"),
		$section = $(".section"),
		win_width = window.innerWidth,
		win_height = window.innerHeight,
		pageY,
		contentsFrontY; // 스크롤 시 gnb 고정을 위한 이벤트 발생 offset 값 설정.


	/* 스크롤 시 side_nav 버튼 효과 */
	$(window).on('mousewheel DOMMouseScroll', function(e){
		var currTop = $(window).scrollTop();
		var $section = $(".section");

		if(currTop >= $section.eq(2).offset().top - 300){
			colorChange();
		}else {
			colorReturn();
		}

	});

	/* 스크롤 시 side_nav 버튼 효과 */
	$(window).scroll(function(){
		var currTop = $(window).scrollTop();
		var $section = $(".section");		

		if(currTop >= $section.eq(2).offset().top - 300){
			colorChange();
		}else {
			colorReturn();
		}
		
	});

	
	/* side_nav Click Event */
	$(".side_nav li a").each(function(i){

		$(this).on({
			click: function(){

				var d_offset = $('.section').eq(i).offset().top;

				$(window).scroll(function () { 
						var currTop = $(window).scrollTop();
						if(i >= 2){
							colorChange();
						}else {
							colorReturn();
						}
				});

				$(".side_nav li a").removeClass("on");
				$(this).addClass("on");
				
				//console.log(d_offset);
				$('body,html').stop().animate({ 'scrollTop' : d_offset}, 800, 'easeInOutSine');

				return false;
			}
		});
	});



	function colorChange(){
		$(".side_nav").addClass("color_change");
	}

	function colorReturn(){
		$(".side_nav").removeClass("color_change");
	}



	


$(window).load(function(){  

	// ScrollMagic Controller 생성
	var controller5 = new ScrollMagic.Controller();

	var section1_H = $(".section").eq(0).outerHeight();
	var section2_H = $(".section").eq(1).outerHeight();
	var section3_H = $(".section").eq(2).outerHeight();
	var section4_H = $(".section").eq(3).outerHeight();

	// Scene Object를 생성
	// scene이 일어날 트리거를 지정 + duration 지정
	new ScrollMagic.Scene({triggerElement: "#section1" , duration: section1_H})
					.setClassToggle("#side_nav1", "on") // add class toggle
					//.addIndicators({name: "nav1"}) // add indicators (requires plugin)
					.addTo(controller5);
	new ScrollMagic.Scene({triggerElement: "#section2" , duration: section2_H})
					.setClassToggle("#side_nav2", "on") // add class toggle
					//.addIndicators({name: "nav2"}) // add indicators (requires plugin)
					.addTo(controller5);
	new ScrollMagic.Scene({triggerElement: "#section3" , duration: section3_H})
					.setClassToggle("#side_nav3", "on") // add class toggle
					//.addIndicators({name: "nav3"}) // add indicators (requires plugin)
					.addTo(controller5);
	new ScrollMagic.Scene({triggerElement: "#section4" , duration: section4_H})
					.setClassToggle("#side_nav4", "on") // add class toggle
					//.addIndicators({name: "nav4"}) // add indicators (requires plugin)
					.addTo(controller5);


});
	

	



	$(window).trigger("resize");





});