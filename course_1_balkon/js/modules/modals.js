const modals = (state) => {
	function bindModal(triggerSelector, modalSelector, closeSelector, state = false, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

		let openModal = false;
		
		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				if (state) {
					if (triggerSelector === '.popup_calc_button') {
						if (
							typeof state.height != 'undefined' && 
							typeof state.width != 'undefined' && 
							typeof state.form != 'undefined'
							) {
								removeError('modalError');
								openModal = true;
							}
							else{
								addError('Ошибка, заполните форму', item, 'modalError');
							}
					}
					if (triggerSelector === '.popup_calc_profile_button') {
						if (
							typeof state.type != 'undefined' && 
							typeof state.profile != 'undefined'
						) {
							removeError('modalError');
							openModal = true;
						}
						else{
							addError('Ошибка, заполните форму', item, 'modalError');
						}
					}
				}
				else {
					openModal = true;
				}

				if (openModal) {
					windows.forEach(item => {
						item.style.display = 'none';
					});

					modal.style.display = "block";
					document.body.style.marginRight = calcScroll() + 'px';
					document.body.style.overflow = "hidden";
					// document.body.classList.add('modal-open');

				}
			});
		});

		function addError(text, obj, errorBlockId){
			let error = document.createElement('div');
			error.setAttribute('id', errorBlockId);
			error.innerHTML = text;			
			if(!document.getElementById(errorBlockId)){
				obj.parentElement.append(error);
			}
			setTimeout(() => {
				removeError(errorBlockId)
			}, 2000);		
		}
		function removeError(errorBlockId){
			if(document.getElementById(errorBlockId)){
				document.getElementById(errorBlockId).remove();
			}
		}

		close.addEventListener('click', () => {

			windows.forEach(item => {
				item.style.display = 'none';
			});
			document.body.style.marginRight = 0;
			modal.style.display = "none";
			document.body.style.overflow = "";
			// document.body.classList.remove('modal-open');
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				windows.forEach(item => {
					item.style.display = 'none';
				});
				modal.style.display = "none";
				document.body.style.marginRight = 0;
				document.body.style.overflow = "";
				// document.body.classList.remove('modal-open');
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(function () {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = "hidden";
		}, time);
	}

	function calcScroll(){
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflow = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	}
	
	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', state, false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', state, false);
	// showModalByTime('.popup', 60000);
};

export default modals;