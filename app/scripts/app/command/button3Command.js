import Command from './command';
/**
 * Button3
 */
class Button3 extends Command{
  constructor(author){
    super();
    this.author = author;
  }

  execute(){
    this.author.shot();
  }
}

export default Button3;
