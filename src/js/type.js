window.addEventListener('DOMContentLoaded', () => {

  /*
  * @const innerWindowEl {object}
  * @const contentTypedEl {object}
  * @const windowText {string}
  * @const pText {string}
  * @let nTimerId {number} [undefined]
  */
  const innerWindowEl  = document.querySelector('.window--inner');
  const contentTypedEl = document.querySelector('.content--typed');

  const windowText = 'Hello from Js and Css';
  const pText      = 'Things tackled here. BEM terminology, ES6, CSS animations, Scss/Js loops and Js timers';

  let nTimerId;


  /*
  * @function typeIt - takes text and splits it and writes each val in the arry in a DOM obj.
  * @global
  * @param str {string} - string
  * @param el {object} - DOM object
  */
  function typeIt(str, el) {
    el.innerHTML = '';
    let arry     = str.split('');

    for (var i = 0; i < arry.length; i++) {
      (function(i) {
      
        nTimerId = setTimeout( () => {
          el.innerHTML += arry[i];

          if ( (i + 1) == arry.length ) {
            setTimeout( () => {
              typeIt(str, el);
            }, 5000);
          }

        }, 300 * i);
      }(i));
    } /* end of for loop */
  }

  typeIt(windowText, innerWindowEl);
  typeIt(pText, contentTypedEl);
})