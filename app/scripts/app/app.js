// import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
import PVector from '../modules/pVector';
import Gamepad from './pad';
import Player from './player';

const renderer = new PixiRenderer();
const { width, height } = renderer.renderer;

const pad = new Gamepad();
const direction = {};

const setPadEvent = () => {
  pad.on(pad.buttonEvent.button3.press, () => {
    console.log('press');
  });

  pad.on(pad.buttonEvent.button3.hold, () => {
    console.log('hold');
  });

  pad.on(pad.buttonEvent.button3.release, () => {
    console.log('release');
  });

  pad.on(pad.axisEvent.axis0, (value) => {
    direction.x = value * 0.5;
  });

  pad.on(pad.axisEvent.axis1, (value) => {
    direction.y = value * 0.5;
  });
};

pad.on('ready', () => {
  setPadEvent();
});

const player = new Player(width / 2, height / 2, width, height);
renderer.addChild(player.shape);

renderer.draw(() => {
  player.applyForce(new PVector(direction.x, direction.y));
  player.display();
  direction.x = 0;
  direction.y = 0;
});
