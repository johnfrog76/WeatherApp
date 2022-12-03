import './temp-toggle.css';
import {bindable} from 'aurelia-framework';

export class TempToggle {
  @bindable celcius: boolean;
  @bindable handleclick: () => void;
  message: string;

  onTempClick (evt) {
    if (evt.type === 'click' || (evt.type === 'keydown' && evt.key.toLowerCase() === 'enter')) {
      this.handleclick();
    } else {
      return true;
    }
  }

  constructor() {}
}
