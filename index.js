import gpio from 'gpio';
//onst mcpadc = require('mcp-spi-adc');
import mcpadc from 'mcp-spi-adc';

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

const tempSensor = mcpadc.open(17, { speedHz: 20000 }, (err) => {
  if (err) throw err;
  console.log('temp sensor is ready');

  setInterval((_) => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      console.log(reading);
      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
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
