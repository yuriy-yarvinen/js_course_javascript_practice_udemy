const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
	const header = document.querySelector(headerSelector),
		content = document.querySelectorAll(contentSelector);
	let tabIndex;
	function hideTabContent() {
		content.forEach(item => {
			item.style.display = 'none';
		});

		document.querySelectorAll(tabSelector).forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		content[i].style.display = display;

		document.querySelectorAll(tabSelector).forEach(item => {
			if(item.getAttribute('data-index') == i){
				item.classList.add(activeClass);
			}
		})
	}

	hideTabContent();
	showTabContent();

	header.addEventListener('click', (e) => {
		const target = e.target;
		if (target &&
			(target.classList.contains(tabSelector.replace(/\./, "")) ||
				target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
			tabIndex = target.getAttribute('data-index') || target.parentNode.getAttribute('data-index');
			hideTabContent();
			showTabContent(tabIndex);
		}
	});
};

export default tabs;