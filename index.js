import gpio from 'gpio';

let currentState = {
  isReady: false,
  isAlerted: false,
};

console.log('script started');

const gpio4 = gpio.export(17, {
  direction: gpio.DIRECTION.IN,
  interval: 500,
  ready: function () {
    console.log('gpio17 is ready');
    currentState.isReady = true;
  },
});

gpio4.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log('move', val);
});
