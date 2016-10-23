import EE from 'eventemitter3';

const rAF = window.mozRequestAnimationFrame || window.requestAnimationFrame;

let c = 0;

/**
 * Gamepad
 */
class Gamepad extends EE{
  constructor(){
    super();
    this.hold = {};
    this.update = this.update.bind(this);
    this._ready = false;
    this.buttonEvent = null;
    this.axisEvent = null;
    this.debug = false;
    rAF(this.update);
  }

  update(){
    // Gamepadを検索,毎回getGamepadsしないとうまくいかない
    const _pads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    const pad = _pads[0];
    if(pad) {
      if(!this._ready){
        if(!this.buttonEvent){
          this.buttonEvent = {};
          for(let i = 0; i < pad.buttons.length; i++){
            const buttonName = `button${i}`;
            this.buttonEvent[buttonName] = {
              press  : `${buttonName}Press`,
              hold   : `${buttonName}Hold`,
              release: `${buttonName}Release`
            };
          }
        }

        if(!this.axisEvent){
          this.axisEvent = {};
          pad.axes.forEach((axisValue, i) => {
            this.axisEvent[`axis${i}`] = `axis${i}`;
          });
        }
        this._ready = true;
        this.emit('ready');
      }
      /*
      if(c % 100 === 0){
        console.log(pad);
        this.emit(Gamepad.Y);
      }
      */

      // ボタンのチェック
      const but = [];
      for(var i = 0 ; i < pad.buttons.length; i++) {
        const btn = pad.buttons[i];
        const val = btn.value;
        but[i] = val;
        if(val === 1){
          if(this.hold[i]){
            // hold
            this.emit(`button${i}Hold`);
          }else{
            // press
            this.hold[i] = true;
            this.emit(`button${i}Press`);
          }
        }else{
          // release
          if(this.hold[i]){
            this.hold[i] = false;
            this.emit(`button${i}Release`);
          }
        }
      }


      // スティックのチェック
      const axes = pad.axes;
      pad.axes.forEach((axisValue, i) => {
        const val = +axisValue.toFixed(2);
        if(val !== 0){
          this.emit(`axis${i}`, val);
        }
      });

      if(this.debug){
        let txt = pad.id + "<br>";
        for(let i = 0 ; i < but.length; i++) {
          if( but[i] == 1)  txt += '<input type="checkbox" checked="checked">';
          else              txt += '<input type="checkbox" >';
        }
        for(var i = 0 ; i < axes.length; i++) {
          txt += '<br>';
          txt += axes[i] ;
        }
        document.body.innerHTML = txt;
      }
    }
    rAF(this.update);
  }
}

export default Gamepad;
