/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  // dæmi sem notar for lykkju
  const upper = str.toLocaleUpperCase();

  let result = '';
  let index = -1;
  for (let i = 0; i < str.length; i += 1) {
    index = alphabet.indexOf(upper[i]);
    if (index !== -1) {
      result += alphabet[(alphabet.indexOf(upper[i]) + n) % alphabet.length];
    }
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  return str
    .toLocaleUpperCase()
    .split('')
    // ef s er í stafrófinu, skilar hliðruðu indexi á bilinu [0;alphabet.length[
    // annars skilar -1
    .map((s) => (alphabet.indexOf(s) < 0 ? -1
      : (alphabet.length + alphabet.indexOf(s) - n)) % alphabet.length)
    // skilar hliðruðum staf ef s var í stafrófi, annars ''
    .map((i) => (i < 0 ? '' : alphabet[i]))
    .join('');
}

function getResult(str, n, type, alphabet) {
  if (type === 'encode') {
    return encode(str, n, alphabet);
  }
  return decode(str, n, alphabet);
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function init(el) {
    // Setja event handlera á viðeigandi element
    const alphabetInput = el.querySelector('.alphabet');
    const radioInput = el.querySelector('.radio');
    const rangeInput = el.querySelector('.range');
    const shiftSelector = rangeInput.querySelector('input');
    const stringInput = document.getElementById('input');
    const resultDisplay = el.querySelector('.result');

    alphabetInput.addEventListener('change', (event) => {
      alphabet = event.target.value;
      const shiftBefore = shiftSelector.value;
      shiftSelector.max = alphabet.length;

      if (shiftBefore > alphabet.length) {
        shift = alphabet.length;
        shiftSelector.value = alphabet.length;
        rangeInput.querySelector('.shiftValue').innerHTML = alphabet.length;
      }

      resultDisplay.innerHTML = getResult(stringInput.value, shift, type, alphabet);
    });

    rangeInput.addEventListener('change', (event) => {
      shift = parseInt(event.target.value, 10);
      rangeInput.querySelector('.shiftValue').innerHTML = shift;

      resultDisplay.innerHTML = getResult(stringInput.value, shift, type, alphabet);
    });

    radioInput.addEventListener('change', (event) => {
      type = event.target.value;

      resultDisplay.innerHTML = getResult(stringInput.value, shift, type, alphabet);
    });

    stringInput.addEventListener('change', () => {
      resultDisplay.innerHTML = getResult(stringInput.value, shift, type, alphabet);
    });
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
