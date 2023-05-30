import gpio from 'gpio';
import { io } from 'socket.io-client';

var socket = io.connect('http://localhost:3006', {
  withCredentials: true,
});

socket.on('connect', function (data) {
  console.log('Hello World from client');
});

let dataToCheck = {
  move: 0,
  sound: 0,
  gas: 0,
};

let currentState = {
  isReady: [false, false, false],
  isAlerted: false,
};

const handleChangeData = (sensor, data) => {
  if (data) {
    dataToCheck[sensor] = data;
  }
};

const gpio4 = gpio.export(4, {
  direction: gpio.DIRECTION.IN,
  interval: 20,
  ready: function () {
    console.log('gpio4 is ready');
    currentState.isReady[0] = true;
  },
});
gpio4.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log('move', val);
  handleChangeData('move', val);
});

const gpio17 = gpio.export(17, {
  direction: gpio.DIRECTION.IN,
  interval: 100,
  ready: function () {
    console.log('gpio17 is ready');
    currentState.isReady[1] = true;
  },
});

gpio17.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log('sound', val);
  handleChangeData('sound', val);
});

const gpio26 = gpio.export(26, {
  direction: gpio.DIRECTION.IN,
  interval: 100,
  ready: function () {
    console.log('gpio17 is ready');
    currentState.isReady[2] = true;
  },
});

gpio26.on('change', function (val) {
  // value will report either 1 or 0 (number) when the value changes
  console.log('gas', val);
  handleChangeData('gas', val);
});

const apiInterval = setInterval(() => {
  if (currentState.isReady.every((item) => item)) {
    console.log(dataToCheck);
  }
}, 1200);
