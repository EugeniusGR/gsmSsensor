import fetch from 'node-fetch';

setInterval(() => {
  fetch('/api/gpio/4')
    .then((response) => response.json())
    .then((pinData) => {
      console.log(pinData);
    });
}, 200);
