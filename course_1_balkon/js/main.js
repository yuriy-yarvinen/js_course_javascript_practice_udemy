import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => {
	'use_strict';

	let modalCalcState = {
		type: 'tree'
	};
	let deadline = '2020-10-26';
	let timerSelectors = {
		parent: '.container1',
		days: '#days',
		hours: '#hours',
		minutes: '#minutes',
		seconds: '#seconds',
	};
	let imagesSettings = {
		parent: '.works',
		modalClass: 'popup',
		matchesClass: 'div.popup',
		imgClass: 'preview',
	};


	changeModalState(modalCalcState);
	modals(modalCalcState);
	tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
	tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
	tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
	forms(modalCalcState);
	timer(timerSelectors, deadline);
	images(imagesSettings);
});