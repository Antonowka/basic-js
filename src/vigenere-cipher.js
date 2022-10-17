const {
	NotImplementedError
} = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
	constructor(direction = true) {
		this.direction = direction;
	}
	encrypt(string, key) {
		if (!string || !key) {
			throw new Error("Incorrect arguments!");
		}
		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
		string = string.toUpperCase();
		key = key.toUpperCase();
		let keyIndex = 0;
		let newString = [];
		for (let i = 0; i < string.length; i++) {
			if (!alphabet.includes(string[i])) {
				newString.push(string[i]);
			} else {
				if (keyIndex >= key.length) {
					keyIndex = 0;
				}
				let num = alphabet.indexOf(string[i]) + alphabet.indexOf(key[keyIndex]);
				if (num > 25) {
					num = num - 26;
				}
				newString.push(alphabet[num]);
				keyIndex++;
			}
		}
		if (this.direction) {
			return newString.join('');
		} else {
			return newString.reverse().join('');
		}
	}
	decrypt(string, key) {
		if (!string || !key) {
			throw new Error("Incorrect arguments!");
		}
		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
		string = string.toUpperCase();
		key = key.toUpperCase();
		let keyIndex = 0;
		let newString = [];
		for (let i = 0; i < string.length; i++) {
			if (!alphabet.includes(string[i])) {
				newString.push(string[i]);
			} else {
				if (keyIndex >= key.length) {
					keyIndex = 0;
				}
				let num = alphabet.indexOf(string[i]) - alphabet.indexOf(key[keyIndex]);
				if (num < 0) {
					num = 26 + num;
				}
				newString.push(alphabet[num]);
				keyIndex++;
			}
		}
		if (this.direction) {
			return newString.join('');
		} else {
			return newString.reverse().join('');
		}
	}
}

module.exports = {
	VigenereCipheringMachine
};