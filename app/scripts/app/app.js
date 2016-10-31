// import _ from 'lodash';
import PixiRenderer from '../modules/pixiRenderer.js';
import PVector from '../modules/pVector';
import Gamepad from './pad';
import Player from './player';
import Button1Command from './command/button1Command';
import Button3Command from './command/button3Command';
import MoveCommand from './command/moveCommand';

const renderer = new PixiRenderer();
const { width, height } = renderer.renderer;

const pad = new Gamepad();
const direction = {};

const player = new Player(renderer, width / 2, height * 0.9, width, height);
let command = null;
let commands = [];

const setPadEvent = () => {
  pad.on(pad.buttonEvent.button1.press, () => {
    commands.push(new Button1Command(player));
  });

  pad.on(pad.buttonEvent.button3.press, () => {
    commands.push(new Button3Command(player));
  });

  pad.on(pad.buttonEvent.button3.hold, () => {
    commands.push(new Button3Command(player));
    // console.log('hold');
  });

  pad.on(pad.buttonEvent.button3.release, () => {
    // console.log('release');
  });

  pad.on(pad.axisEvent.axis0, (value) => {
    commands.push(new MoveCommand(player, value * 0.5, 0));
  });

  pad.on(pad.axisEvent.axis1, (value) => {
    commands.push(new MoveCommand(player, 0, value * 0.5));
  });
};

pad.on('ready', () => {
  setPadEvent();
});


document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  switch (keyName) {
    case 'ArrowLeft':
      command = new MoveCommand(player, -1, 0);
      break;
    case 'ArrowRight':
      command = new MoveCommand(player, 1, 0);
      break;
    case 'ArrowUp':
      command = new MoveCommand(player, 0, -1);
      break;
    case 'ArrowDown':
      command = new MoveCommand(player, 0, 1);
      break;
    case ' ':
      command = new Button3Command(player);
      break;
    case 'z':
      command = new Button1Command(player);
      break;
    default:
  }
});

// document.addEventListener('keyup', (event) => { });


renderer.draw(() => {
  if(commands.length > 0){
    commands.forEach((command) => {
      command.execute();
    });
    commands = [];
  }
  player.display();
});
