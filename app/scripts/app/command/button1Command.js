import Command from './command';
/**
 * Button1
 */
class Button1Command extends Command{
  constructor(author){
    super();
    this.author = author;
  }

  execute(){
    this.author.changeShotMode();
  }
}

export default Button1Command;
