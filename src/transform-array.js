const {
	NotImplementedError
} = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
	if (!Array.isArray(arr)) {
		throw new Error("'arr' parameter must be an instance of the Array!")
	}

	const controllers = ['--discard-next', '--discard-prev', '--double-next', '--double-prev']

	return arr.reduce((acc, curr, index) => {
		if (curr === '--discard-prev' && acc.length && arr[index - 2] !== '--discard-next') {
			return acc.slice(0, -1);
		}
		if (arr[index - 1] && arr[index - 1] === '--discard-next') {
			return [...acc];
		}
		if (arr[index + 1] && curr === '--double-next') {
			return [...acc, arr[index + 1]];
		}
		if (arr[index - 1] && curr === '--double-prev' && arr[index - 2] !== '--discard-next') {
			return [...acc, arr[index - 1]];
		}

		if (controllers.indexOf(curr) === -1) {
			return [...acc, curr]
		};

		return [...acc]
	}, [])
}

module.exports = {
	transform
};