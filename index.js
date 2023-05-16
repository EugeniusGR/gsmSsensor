import gpio from 'gpio';
let currentState = {
  isReady: false,
  isAlerted: false,
};
console.log('script started');

const gpio4 = gpio.export(4, {
  direction: gpio.DIRECTION.IN,
  interval: 20,
  ready: function () {
    console.log('gpio4 is ready');
    currentState.isReady = true;
  },
});

gpio4.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log('move', val);
});

const gpio2 = gpio.export(4, {
  direction: gpio.DIRECTION.IN,
  interval: 20,
  ready: function () {
    console.log('gpio2 is ready');
    currentState.isReady = true;
  },
});

gpio2.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log('temperature', val);
});

export default (req, res) => {
  const {
    query: { pinId },
  } = req;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      textMessage: `Pin id passed in query: ${pinId}`,
      ...currentState,
    })
  );
};
