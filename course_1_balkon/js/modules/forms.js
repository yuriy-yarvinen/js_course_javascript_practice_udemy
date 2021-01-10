import checkNumberInputs from './checkNumberInputs';
import {postData} from '../services/requests';

const forms = (state) => {
	
	const form = document.querySelectorAll('form'),
	inputs = document.querySelectorAll('input');

	checkNumberInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так'
	};

	const clearInpunts = () =>{
		inputs.forEach(item => {
			item.value = '';
		})
	}

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
		
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);
			if(item.getAttribute('data-calc') === 'end'){
				for(let key in state){
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData).then(response => {
			
				statusMessage.innerHTML = message.success;
			}).catch(()=>{
				statusMessage.innerHTML = message.failure;
			}).finally(()=>{
				clearInpunts();
				setTimeout(() => {
					statusMessage.remove();
				}, 5000);
			})
		})
	})
};

export default forms;