const w = +prompt('Ширина матрицы');
const h = +prompt('Высота матрицы');
// const w = 7;
// const h = 6;

function matrix(w,h){
	let result = new Array(h).fill().map(()=> new Array(w).fill(''));
	let counter = 1;
	let startCol = 0;
	let endCol = w - 1;
	let startRow = 0;
	let endRow = h - 1;

	while(startCol <= endCol && startRow <= endRow){
		for(let i = startCol; i <= endCol; i++){
			result[startRow][i]= counter;
			counter++;
		}
		startRow++;
		for(let j = startRow; j <= endRow; j++){
			result[j][endCol] = counter;
			counter++;
		}
		endCol--;

		for(let z = endCol; z >= startCol; z--){
			result[endRow][z] = counter;
			counter++;
		}
		endRow--;

		for(let c = endRow; c >= startRow; c--){
			result[c][startCol] = counter;
			counter++;
		}
		startCol++;
	}

	return result;
}

console.log(matrix(w,h));

// Важно!!! Копирование объектов только через Object.assign({}, obj)
const test = {
	item: 5
};

let test2 = Object.assign({},test);

test2.item = 10;
console.log(test);
console.log(test2);