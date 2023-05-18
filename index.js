import gpio from 'gpio';
import { io } from 'socket.io-client';

var socket = io.connect('http://localhost:3006', {
  withCredentials: true,
});

socket.on('connect', function (data) {
  console.log('Hello World from client');
});

let currentState = {
  isReady: false,
  isAlerted: false,
};

const sendDataToTheServer = (data) => {};

sendDataToTheServer('works');

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
