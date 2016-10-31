import PVector from '../modules/pVector';
/**
 * 弾
 */
class Bullet{
  constructor(renderer, x, y, vx = 0, vy = -15){
    this.renderer = renderer;
    this.location = new PVector(x, y);
    // this.velocity = new PVector(0, -15);
    this.velocity = new PVector(vx, vy);
    // this.acceleration = new PVector(0, -5);
    this.topSpeed = 4;
    this.mass = 1;
    this.width = renderer.renderer.width;
    this.height = renderer.renderer.height;
    this._createSpahe();
    this.shape.position.set(this.location.x, this.location.y);
  }

  _createSpahe(){
    this.shape = new PIXI.Graphics();
    this.shape
      .beginFill(randomColor())
      .drawCircle(0, 0, 5)
      .endFill();
    this.renderer.addChild(this.shape);

  }
  applyForce(force){
    const f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update(){
    // this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
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
      // 消える
      location.y = height;
    }
  }

  isDead(){
    return this.location.y < 0;
  }

  destroy(){
    this.renderer.removeChild(this.shape);
    this.shape.destroy();
  }

  display(){
    const { location } = this;
    this.shape.position.set(location.x, location.y);
  }

  run(){
    this.update();
    // this.checkEdge();
    this.display();
  }
}

export default Bullet;
