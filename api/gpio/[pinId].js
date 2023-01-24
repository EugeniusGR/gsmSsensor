import gpio from 'gpio';

let currentState = {
  isReady: false,
  isAlerted: false,
};

console.log('script started');

const gpio17 = gpio.export(17, {
  direction: gpio.DIRECTION.IN,
  interval: 20,
  ready: function () {
    console.log('gpio17 is ready');
    currentState.isReady = true;
  },
});

gpio17.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log(`[${new Date().getTime()}]: moved`, val);
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
