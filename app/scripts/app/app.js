// import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
import PVector from '../modules/pVector';
import Gamepad from './pad';
import Player from './player';

const renderer = new PixiRenderer();
const { width, height } = renderer.renderer;

const pad = new Gamepad();
const direction = {};

const player = new Player(renderer, width / 2, height * 0.9, width, height);

const setPadEvent = () => {
  pad.on(pad.buttonEvent.button3.press, () => {
    player.shot();
  });

  pad.on(pad.buttonEvent.button3.hold, () => {
    // console.log('hold');
  });

  pad.on(pad.buttonEvent.button3.release, () => {
    // console.log('release');
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


document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  switch (keyName) {
    case 'ArrowLeft':
      direction.x = -1;
      break;
    case 'ArrowRight':
      direction.x = 1;
      break;
    case 'ArrowUp':
      direction.y = -1;
      break;
    case 'ArrowDown':
      direction.y = 1;
      break;
    case ' ':
      player.shot();
      break;
    case 'z':
      player.changeShotMode();
      break;
    default:
  }
});

// document.addEventListener('keyup', (event) => { });


renderer.draw(() => {
  const d = new PVector(direction.x, direction.y);
  player.applyForce(d);
  player.display();
  direction.x = 0;
  direction.y = 0;
});
