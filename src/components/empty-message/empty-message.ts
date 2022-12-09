import {bindable} from 'aurelia-framework';
import './empty-message.css';

export class EmptyMessage {
  @bindable message: string;
  @bindable showmore: boolean;

  activate () {}
  
  constructor() {}

  handleUserAction (evt: Event):void {
    evt.preventDefault();
    try {
      const focusEl:HTMLInputElement = document.querySelector('.suggest-city-control > input');  
      focusEl.focus();
    } catch (err) {
      console.error('unable to focus button');
    }

  }
}
