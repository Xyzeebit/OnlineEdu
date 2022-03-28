(function($) {

    const state = {
        animated: {
            hd: false,
            presenters: false,
            money: false,
            free: false
        }
    }

    $('.menu-button').on('click', function(e) {
        $(this).toggleClass('active')
        $(this).find('div').removeClass('stop-animation');
        $('.sidebar').toggleClass('show-sidebar');

        animateMenuItems();


    });

    $('a.mi').on('click', function(e) {
        $('.menu-button').toggleClass('active');
        $('.menu-button').find('div').removeClass('stop-animation');
        $('.sidebar').removeClass('show-sidebar');

        animateMenuItems();
    });
	
	$('#loginButton').on('click', function(e) {
		location.href = './account.html?login';
	});
	$('#registerButton').on('click', function(e) {
		location.href = './account.html?register';
	});

	$('#search-input').on('blur', function(e) {
		if(e.target.value) {
			$('#search-input + label').css('opacity', '0');
		} else {
			$('#search-input + label').css('opacity', '1');
		}
		
	});

    $('#search-input').on('focus', function(e) {
        $('.search-icon').addClass('input-focused');
    });


    $('#search-input').on('blur', function(e) {
        $('.search-icon').removeClass('input-focused');
    });

    $('.btn').on('click', function(e) {
        $(this).append('<span class="ripple"></span>');
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        $(this).children('span').css('left', `${x}px`);
        $(this).children('span').css('top', `${y}px`);

        setTimeout(() => {
            $(this).children('span').remove();
        }, 300)
    });

    let hd = document.querySelector('#hd-videos');

    if (!state.animated.hd && isInViewport(hd)) {

        let el = $('#hd-videos .stats').children('span:first');
        animateValue(el, 100, '+', 'K');
        state.animated.hd = true;
    }


    $('.dropdown-button').on('click', function(e) {
        $(this).children('img').toggleClass('rotate');
        $(this).next('.links').toggleClass('dropdown');
    })




    $(window).on('scroll', function(e) {
        if ($(this).scrollTop() > 100) {
            $('nav').css('background', '#fff');
            $('nav').css('box-shadow', '0 2px 10px 0 rgba(0,0,0,0.3)');
            $('#loginButton').css('color', 'teal')
            $('.nav-brand img').css('box-shadow', '0 2px 10px 0 rgba(0,0,0,0,0.3)');
        } else {
            $('nav').css('background', 'transparent');
            $('nav').css('box-shadow', 'none');
            $('#loginButton').css('color', '#fff');
            $('.nav-brand img').css('box-shadow', 'none');
        }


        let presenters = document.querySelector('#presenters')
        let money = document.querySelector('#money');


        if (!state.animated.presenters && isInViewport(presenters)) {

            let el = $('#presenters .stats').children('span:first');
            animateValue(el, 200, '+', '');
            state.animated.presenters = true;
        }

        if (!state.animated.money && isInViewport(money)) {

            let el = $('#money .stats').children('span:first');
            animateValue(el, 500, '$', '', 10);
            state.animated.money = true;
        }

        let free = document.querySelector('#free-text');
        if (isInViewport(free)) {
            free.classList.add('animate-free');
        }
        animateCourses();
        animateAbout();
        animateUpdates();

        //let video = document.querySelector('#video');
        //if (isInViewport(video)) {
            //console.log('in view')
            //animateVideo();
        //}

    });


   animateVideo();



})(jQuery);

function animateVideo() {
    let posters = ['graduation', 'video', 'teacher'];
    let video = document.querySelector('#video');
    let indicators = document.querySelectorAll('.v-indicator');
    let i = 0;
    let interval;
    
    interval = setInterval(() => {
        if(i == posters.length) {
            i = 0;
        }
        if(i < indicators.length) {
            //for(let j of indicators) {
                
                //j.classList.remove('current-video');
            //}
            //indicators[i].classList.add('current-video');
            indicators[i].style.width = '25px';
            indicators[i].style.borderRadius = '5px';
            
            indicators[(i == 0 ? posters.length - 1 : i - 1)].style.width = '10px';
            indicators[(i == 0 ? posters.length - 1 : i - 1)].style.borderRadius = '100px';
        }
        video.poster = `./images/${posters[i++]}.jpg`
    }, 3000);
}

function animateMenuItems() {
    menuItems = document.querySelectorAll('.mi');
    for (let i = 0; i < 7; i++) {
        menuItems[i].classList.toggle(`animate-mi-${i + 1}`);
    }

}


function animateUpdates() {
    let updates = document.querySelectorAll('.updates-item')
    for (let i of updates) {
        if (isInViewport(i)) {
            i.classList.add('animate-updates');
        }
    }
}

function animateAbout() {
    let about = document.querySelector('#about');
    if (isInViewport(about)) {
        about.classList.add('animate-about');
    }
}

function animateCourses() {
    let courses = document.querySelectorAll('.v-stack');
    for (let i of courses) {
        if (isInViewport(i)) {
            i.classList.add('animate-course');
        }
    }
}


function animateValue(el, breakPoint, before, after, step = 5) {
    let val = 0;
    let interval = setInterval(() => {

        if (val >= breakPoint) {
            clearInterval(interval);
        } else {
            val += step;
            el.text(before + val + after);
        }
    },
        10);
}


function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}