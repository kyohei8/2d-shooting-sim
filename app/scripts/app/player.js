import PVector from '../modules/pVector';
/**
 * Player
 */
class Player{
  constructor(x, y, w, h){
    this.location = new PVector(x, y);
    this.velocity = new PVector();
    this.acceleration = new PVector(0, 0);
    this.topSpeed = 4;
    this.mass = 1;
    this.width = w;
    this.height = h;
    this.shape = this._createSpahe();
    this.shape.position.set(this.location.x, this.location.y);
  }

  _createSpahe(){
    const shape = new PIXI.Graphics();
    shape.lineStyle(1, 0x110022).beginFill(0, 0).drawRect(0, 0, 10, 10).endFill();
    shape.anchor = 0.5;
    return shape;
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
    if(x > width){
      location.x = 0;
    }else if(x < 0){
      location.x = width;
    }

    if(y > height){
      location.y = 0;
    }else if(y < 0){
      location.y = height;
    }
  }

  display(){
    this.addFriction();
    this.update();
    this.checkEdge();
    const { location } = this;
    this.shape.position.set(location.x, location.y);
  }
}

export default Player;
