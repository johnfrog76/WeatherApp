import { bindable } from 'aurelia-framework';

export class SuggestCity {
  @bindable citychild: string;
  @bindable querycity: string;
  @bindable queryresults;
  @bindable querycities: () => void;
  @bindable trapkeys: () => void;
  @bindable selectquerycity: (evt: Event) => void;

  constructor() { }

  handleSelectQueryCity (evt: Event) {
    evt.preventDefault();
    this.selectquerycity(evt);
  }
}
