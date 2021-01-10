const sliders = (slides, prev, next) => {
	let slideIndex = 0,
		paused = false;
	const items = document.querySelectorAll(slides);


		function showSlides(n) {
			if(n > items.length - 1){
				slideIndex = 0;
			}

			if(n < 0){
				slideIndex = items.length - 1;
			}

			items.forEach(item => {
				item.classList.add('animated', 'fadeIn');
				item.style.display = 'none';
			});

			items[slideIndex].style.display = 'block';

		}

		showSlides(slideIndex);

		function plusSlides(n) {
			showSlides(slideIndex += n);
		}

		function activateAnimation(){
			paused = setInterval(() => {
				plusSlides(1);
			}, 3000);
		}

		try{
			const	prevBtn = document.querySelector(prev),
				nextBtn = document.querySelector(next);

			if(prevBtn && nextBtn){
				prevBtn.addEventListener('click', () => {
					plusSlides(-1);
				});
				nextBtn.addEventListener('click', () => {
					plusSlides(1);
				});
			}

		}
		catch(e){
			console.log(e);
		}

		items[0].parentNode.addEventListener('mouseenter', ()=>{
			clearInterval(paused);
		});
		items[0].parentNode.addEventListener('mouseleave', ()=>{
			activateAnimation();
		});

		activateAnimation();

};

export default sliders; 