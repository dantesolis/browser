"use strict";window.addEventListener("DOMContentLoaded",function(){var n=document.querySelector(".window--inner");var e=document.querySelector(".content--typed");var t="Hello from Js and Css";var o="Things tackled here. BEM terminology, ES6, CSS animations, Scss/Js loops and Js timers";var i=void 0;function r(n,e){e.innerHTML="";var t=n.split("");for(var o=0;o<t.length;o++){(function(o){i=setTimeout(function(){e.innerHTML+=t[o];if(o+1==t.length){setTimeout(function(){r(n,e)},5e3)}},300*o)})(o)}}r(t,n);r(o,e)});
//# sourceMappingURL=map/type.js.map
