export default class Customizator {
	constructor() {
		this.btnBlock = document.createElement('div');
		this.colorPicker = document.createElement('input');

		this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
	}

	render() {

		let scaleInputS = document.createElement('input'),
			scaleInputM = document.createElement('input'),
			panel = document.createElement('div');

		panel.appendChild(this.btnBlock, this.colorPicker);

		panel.classList.add('panel');
		scaleInputS.classList.add('scale_btn');
		scaleInputM.classList.add('scale_btn');
		this.btnBlock.classList('scale');
		this.colorPicker.classList('color');

		scaleInputS.setAttribute('type', 'button');
		scaleInputM.setAttribute('type', 'button');
		scaleInputS.setAttribute('value', '1x');
		scaleInputM.setAttribute('value', '1.5x');
		this.colorPicker.setAttribute('type', 'color');
		this.colorPicker.setAttribute('value', '#ffffff');

		this.btnBlock.append(scaleInputS, scaleInputM);


		document.querySelector('body').append(panel);
	}
}