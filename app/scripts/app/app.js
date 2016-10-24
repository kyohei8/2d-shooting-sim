// import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
import PVector from '../modules/pVector';
import Gamepad from './pad';
import Player from './player';
import Shot from './shot';

const renderer = new PixiRenderer();
const { width, height } = renderer.renderer;

const pad = new Gamepad();
const direction = {};
const shots = [];

const player = new Player(width / 2, height * 0.9, width, height);
renderer.addChild(player.shape);

const setPadEvent = () => {
  pad.on(pad.buttonEvent.button3.press, () => {
    // console.log('press');
    const { x, y } = player.location;
    const shot = new Shot(renderer, x + 5, y + 5);
    shots.push(shot);
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

  for (var i = shots.length - 1; i >= 0; i--) {
    const s = shots[i];
    s.run();
    if(s.isDead()){
      s.destroy();
      shots.splice(i, 1);
    }
  }
});
