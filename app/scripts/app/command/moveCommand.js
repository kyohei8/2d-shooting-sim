import Command from './command';
/**
 * moveCommand
 */
class moveCommand extends Command{
  constructor(author, x, y){
    super();
    this.author = author;
    this.x = x;
    this.y = y;
  }

  execute(){
    this.author.moveTo(this.x, this.y);
  }
}

export default moveCommand;
