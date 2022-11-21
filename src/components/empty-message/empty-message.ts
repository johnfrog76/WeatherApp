import {bindable} from 'aurelia-framework';

export class EmptyMessage {
  @bindable message: string;
  @bindable showmore: boolean;

  activate () {
    console.log('message: ', this.message, 'show more: ', this.showmore);
  }
  
  constructor() {}
}
