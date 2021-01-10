window.addEventListener('DOMContentLoaded', () => {

	const body = document.querySelector('body');

	let textArr = [];

	function recursy(element) {
		[...element.childNodes].forEach(node => {
			if (node.nodeName.match(/^H\d/)) {
				const obj = {
					header: node.nodeName,
					content: node.textContent
				};

				textArr.push(obj);
			}
			else {
				recursy(node);
			}
		});
	}

	recursy(body);

	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(textArr)
	})
	.then(response => response.json())
	.then(json => console.log(json));
});