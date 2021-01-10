import checkNumberInputs from './checkNumberInputs';

const forms = () => {

	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		textarea = document.querySelectorAll('textarea'),
		upload = document.querySelectorAll('[name=upload]');

	// checkNumberInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};

	const path = {
		desiner: 'assets/server.php',
		question: 'assets/question.php'
	};

	const postData = async (url, data) => {

		let response = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await response.text();
	}

	const clearInpunts = () => {
		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		})
		inputs.forEach(item => {
			item.value = '';
		})
		textarea.forEach(item => {
			item.value = '';
		})

	}

	upload.forEach(item => {
		
		item.addEventListener('input', () => {
			let dots;
			let splitFile = item.files[0].name.split('.');
			splitFile[0].length > 6 ? dots = '...' : dots = '.';

			const name = splitFile[0].substring(0,6) + dots + splitFile[1];
			item.previousElementSibling.textContent = name;
		})
	})

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);
			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			const formData = new FormData(item);
			let api;

			item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.desiner : api = path.question;

			postData(api, formData).then(response => {
				statusImg.setAttribute('src', message.ok);
				textMessage.innerHTML = message.success;
			}).catch(() => {
				statusImg.setAttribute('src', message.fail);
				textMessage.innerHTML = message.failure;
			}).finally(() => {
				clearInpunts();
				setTimeout(() => {

					statusMessage.remove();
					item.style.display = 'block';
					item.classList.remove('fadeOutUp');
					item.classList.add('fadeInUp');
				}, 5000);
			})
		})
	})
};

export default forms;