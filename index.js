import gpio from 'gpio';

let currentState = {
  isReady: false,
  isAlerted: false,
};

const gpio4 = gpio.export(4, {
  direction: gpio.DIRECTION.IN,
  interval: 500,
  ready: function () {
    console.log('gpio4 is ready');
    currentState.isReady = true;
  },
});

gpio4.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log('move', val);
});
