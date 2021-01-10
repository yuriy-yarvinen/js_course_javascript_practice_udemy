const images = (settingsData) => {
	const imgPopup = document.createElement('div'),
		workSection = document.querySelector(settingsData.parent),
		bigImage = document.createElement('img');
	imgPopup.classList.add(settingsData.modalClass);
	imgPopup.classList.add(settingsData.imgPopupClass);

	imgPopup.style.display = 'none';
	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	workSection.appendChild(imgPopup);

	imgPopup.appendChild(bigImage);

	workSection.addEventListener('click', (e) => {
		e.preventDefault();

		let target = e.target;

		if (target && target.classList.contains(settingsData.imgClass)) {
			imgPopup.style.display = 'flex';
			const path = target.parentNode.getAttribute('href');
			bigImage.setAttribute('src', path);
		}

		if (target && target.matches(settingsData.matchesClass)) {
			imgPopup.style.display = 'none'
		}
	});
};

export default images;

