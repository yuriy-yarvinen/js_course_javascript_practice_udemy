const mask = (selector, matrix) => {
	let setCursorPosiotion = (pos, elem) => {
		elem.focus();
		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		}
		else if (elem.createTextRange) {
			let range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
	function createMask(event) {
		let i = 0,
			def = matrix.replace(/\D/g, ''),
			val = this.value.replace(/\D/g, '');

		if (def.length >= val.length) {
			val = def;
		}

		this.value = matrix.replace(/./g, function (char) {
			return /[_\d]/.test(char) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : char;
		})

		if (event.type === 'blur') {
			if (this.value.length == 2) {
				this.value = '';
			}
		}
		if (event.type === 'click') {
			if(this.value.length == 2){
				this.value = matrix;
				setCursorPosiotion(4, this);
			}
			else{
				setCursorPosiotion(this.value.length, this);
			}			
		}
	}

	let inputs = document.querySelectorAll(selector);

	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('click', createMask);
		input.addEventListener('blur', createMask);
	});

};

export default mask;