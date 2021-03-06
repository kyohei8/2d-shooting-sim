import PVector from '../modules/pVector';
import Bullet from './bullet';
const SHOT_MODE = [
  'NORMAL',
  'DOUBLE',
  'TWO_WAY',
  'THREE_WAY'
];

/**
 * Player
 */
class Player{
  constructor(renderer, x, y, w, h){
    this.renderer = renderer;
    this.location = new PVector(x, y);
    this.velocity = new PVector();
    this.acceleration = new PVector(0, 0);
    this.topSpeed = 4;
    this.mass = 1;
    this.width = w;
    this.height = h;
    this.shots = [];
    this.shotModeCnt = 0;
    this.size = 10

    this.shotMode = SHOT_MODE[this.shotModeCnt];
    this.shape = this._createSpahe();
    this.renderer.addChild(this.shape);
    this.shape.position.set(this.location.x, this.location.y);
  }

  _createSpahe(){
    const shape = new PIXI.Graphics();
    const { size } = this;
    // locationが中央になるようにする
    shape
      .lineStyle(1, 0x110022)
      .beginFill(0, 0)
      .drawRect(-size / 2, -size / 2, this.size, this.size)
      .endFill();
    shape.anchor = 0.5;
    return shape;
  }

  changeShotMode(){
    this.shotModeCnt++;
    this.shotMode = SHOT_MODE[this.shotModeCnt % SHOT_MODE.length];
  }

  shot(){
    switch(this.shotMode){
      case 'NORMAL':
        this.shotSingle();
        break;
      case 'DOUBLE':
        this.shotDouble();
        break;
      case 'TWO_WAY':
        this.shot2way();
        break;
      case 'THREE_WAY':
        this.shot3way();
        break;
      default:
    }
  }

  shotSingle(){
    const { x, y } = this.location;
    const shot = new Bullet(this.renderer, x, y + 5);
    this.shots.push(shot);
  }

  shotDouble(){
    const { x, y } = this.location;
    const shot1 = new Bullet(this.renderer, x - 10, y + 5);
    const shot2 = new Bullet(this.renderer, x + 10, y + 5);
    this.shots.push(shot1);
    this.shots.push(shot2);
  }

  shot2way(){
    const { x, y } = this.location;
    const shot1 = new Bullet(this.renderer, x, y + 5, -1);
    const shot2 = new Bullet(this.renderer, x, y + 5, 1);
    this.shots.push(shot1);
    this.shots.push(shot2);
  }

  shot3way(){
    const { x, y } = this.location;
    const shot1 = new Bullet(this.renderer, x, y + 5, -1);
    const shot2 = new Bullet(this.renderer, x, y + 5, 0);
    const shot3 = new Bullet(this.renderer, x, y + 5, 1);
    this.shots.push(shot1);
    this.shots.push(shot2);
    this.shots.push(shot3);
  }

  moveTo(x,y){
    this.applyForce(new PVector(x, y));
  }

  applyForce(force){
    const f = PVector.div(force, this.mass);
    // const f = PVector.mult(force, 5);
    this.acceleration.add(f);
  }

  addFriction(){
    const friction = this.velocity.get();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01);
    this.applyForce(friction);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
    this.velocity.mult(0.8);
    this.acceleration.mult(0);
  }

  checkEdge(){
    const { location, width, height } = this;
    const { x, y } = location;
    if(x > width - this.size){
      location.x = width - this.size;
    }else if(x < 0){
      location.x = 0;
    }

    if(y > height - this.size){
      location.y = height - this.size;
    }else if(y < 0){
      location.y = 0;
    }
  }

  display(){
    this.addFriction();
    this.update();
    this.checkEdge();
    const { location } = this;
    this.shape.position.set(location.x, location.y);

    // display shot
    for (var i = this.shots.length - 1; i >= 0; i--) {
      const s = this.shots[i];
      s.run();
      if(s.isDead()){
        s.destroy();
        this.shots.splice(i, 1);
      }
    }
  }
}

export default Player;
