const {
	NotImplementedError
} = require('../extensions/index.js');

/**
 * Given an array of domains, return the objectect with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {objectect}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
	const object = {};

	for (let i = 0; i < domains.length; i++) {
		let sum = '';
		let word = domains[i].split('.').reverse();

		for (let j = 0; j < word.length; j++) {
			let newSimbol = '.' + word[j];
			sum += newSimbol;
			object[sum] ? object[sum]++ : object[sum] = 1;
		}

	}

	return object;
}

module.exports = {
	getDNSStats
};