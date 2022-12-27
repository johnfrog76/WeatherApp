import { bindable } from 'aurelia-framework';

export class WeatherModal {
  @bindable current: any;
  @bindable citychild: string;
  @bindable showmodal: boolean;
  @bindable hidemodal: () => void;
  keyboardTrap = {
    modalEle: null,
    tabStopEles: null,
    tabEles: null
  };


  trapModalKeys(evt) {
    const target = evt.target;
    const { modalEle } = this.keyboardTrap;

    if (this.keyboardTrap.modalEle === null) {
      this.keyboardTrap.modalEle = target.closest('.modal');
      this.keyboardTrap.tabStopEles = this.keyboardTrap.modalEle.querySelectorAll('.tabstop');
      this.keyboardTrap.tabEles = this.keyboardTrap.modalEle.querySelectorAll('button, a, input, textarea, [tabindex="0"]');
    }

    if (evt.type === 'keyup' && evt.code.toLowerCase() === 'tab') {
      if (target.classList.contains('tabstop0')) {
        this.keyboardTrap.tabEles[this.keyboardTrap.tabEles.length - 1].focus();
        console.log('tabstop 0 focus')
      } else if (target.classList.contains('tabstop1')) {
        this.keyboardTrap.tabEles[0].focus();
        console.log('tabstop 1 focus')
      }
    }

    return true;
  }
  
  getWindDirection (deg: number) {
    let ret = '';
    if (deg === 0 || deg === 360) {
      ret = 'N';
    } else if (deg === 90) {
      ret = 'E';
    } else if (deg === 180) {
      ret = 'S';
    } else if (deg === 270) {
      ret = 'W';
    } else if (deg > 0 && deg < 90) {
      ret = 'NE';
    } else if (deg > 90 && deg < 180) {
      ret = 'SE';
    } else if (deg > 180 && deg < 270) {
      ret = 'SW';
    } else if (deg > 270 && deg < 360) {
      ret = 'NW'
    }

    return ret;
  }

  constructor() {}
}
