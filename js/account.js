(function($) {
	let queryPos = location.href.indexOf('?');
	let hashPos = location.href.indexOf('#');
	let page = '';
	if(queryPos > -1) {
		if(hashPos > -1) {
			page = location.href.substring(queryPos + 1, hashPos);
		} else {
			page = location.href.substring(queryPos + 1, location.href.length);
		}
		
		if(page === 'login') {
			$('.confirm-pwd').css('display', 'none');
			$('.form-header h1').html('<span>LOGI</span>N');
			$('.intro h1').text('Welcome back');
			$('.intro p').text('Please login to continue');
			$('.err-confirm-password').css('display', 'none');
			//$('.password-group').addClass('pwd-col');
		}
		if(page === 'register') {
			$('#name').css('display', 'block');
			$('.confirm-pwd').css('display', 'block');
			$('.form-header h1').html('<span>REGISTE</span>R');
			
			$('.new-account').attr('href', './account.html?login').children('span').text('Login instead');
			$('.intro h1').text('Nice to meet you :)');
			$('.intro p').text('Just register to join with us');
			$('.err-confirm-password').css('display', 'block');
			$('#remember-me-tac').next('label').html('I have read and accept the Terms of <a href="#" style="font-size: 15px">Service and Privacy Policy</a>');
			$('#forgot').css('display', 'none');
			$('.password-group').addClass('reg-pwd-group');
		}
	}
	
	
	const red = '#fd3939';
	const blue = '#2e97c1';
	const grey = '#666';
	const border = '1px solid ' + grey;
	let pwd, cpwd;
	
	$('.input-group input').on('focus', function(e) {
		$(this).css('border', `1px solid ${blue}`);
		$(this).next('label').css('top', '2px').css('font-size', '12px').css('color', blue).css('opacity', '1');
	});
	$('.input-group input').on('blur', function(e) {
		const { target } = e;
		if(target.value) {
			const type = target.attributes.type.nodeValue;
			
			switch(type) {
				case "text":
					// sanitize name
					if(target.value.length > 3) {
						$(this).css('border', `1px solid ${grey}`);
						$(this).next('label').css('opacity', '0');
						//$(this).css('margin-bottom', '15px');
						$('.err-name').css('opacity', '0');
					} else {
						$(this).css('border', `1px solid ${red}`);
						$(this).next('label').css('top', '2px').css('font-size', '12px').css('color', red);
						//$(this).css('margin-bottom', '0px');
						$('.err-name').css('opacity', '1');
					}
					break;
				case "email":
					if(isEmail(target.value)) {
						
						$(this).css('border', `1px solid ${grey}`);
						$(this).next('label').css('opacity', '0');
						$('.err-email').css('opacity', '0');
						
					} else {
						$(this).css('border', `1px solid ${red}`);
						$(this).next('label').css('top', '2px').css('font-size', '12px').css('color', red);
						$('.err-email').css('opacity', '1');
					}
					break;
				case "password":
					
					const password = target.value;
					
					if($(this).is($('#password'))) {
						pwd = target.value;
						if(target.value.length >= 6) {
							$(this).css('border', `1px solid ${grey}`);
							$(this).next('label').css('opacity', '0');
							$('.err-password').css('opacity', '0');
						} else {
							$(this).css('border', `1px solid ${red}`);
							$(this).next('label').css('top', '2px').css('font-size', '12px').css('color', red);
							$('.err-password').css('opacity', '1');
						}
					} else {
						cpwd = target.value;
						if(cpwd === pwd) {
							$(this).css('border', `1px solid ${grey}`);
							$(this).next('label').css('opacity', '0');
							$('.err-confirm-password').css('opacity', '0');
						} else {
							$(this).css('border', `1px solid ${red}`);
							$(this).next('label').css('top', '2px').css('font-size', '12px').css('color', red);
							$('.err-confirm-password').css('opacity', '1');
						}
						
					}
					break;
				default: return;
			}
		} else {
			$(this).css('border', `1px solid ${grey}`);
			$(this).next('label').css('opacity', '1').css('top', '18px').css('font-size', '15px').css('color', grey);
		}
	});
	
	$('form').on('submit', function(e) {
		let email = $('#email').val();
		pwd = $('#password').val();;
		cpwd = $('#password-confirm').val();
		
		if(page === '' || page === 'login') {
			if(validateLogin(email, pwd)) {
				pwd = '';
				cpwd = '';
			} else {
				e.preventDefault();
				console.log('error');
			}
		} else {
			if(validateRegister(email, pwd, cpwd)) {
			
			
			} else {
				e.preventDefault();
				console.log('error');
			}
		}
		
	});

})(jQuery);


function validateRegister(email, pwd, cpwd) {
	if(email && pwd.length >= 6 && pwd == cpwd) {
		if(isEmail(email)) {
			return true
		}
	}
	return false;
}
function validateLogin(email, pwd) {
	if(isEmail(email) && pwd.length >= 6) return true;
	return false;
}
function isEmail(email) {
	let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	//let pattern = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;
	return email.match(pattern);
}
function sanitize(value) {
	let pattern = /[^\w\s]/gi;
	return value.replace(pattern, '');
}
//let str = 'kjjuii87'.replace(/[^a-zA-Z0-9 ]/g, '');  /* /[^\w\s]/gi, '' */