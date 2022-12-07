import { bindable } from 'aurelia-framework';
import { iCity } from '../../interfaces/city/city';

export class SuggestCity {
  @bindable citychild: string;
  @bindable querycity: string;
  @bindable queryresults: iCity[];
  @bindable querycities: () => void;
  @bindable trapkeys: (evt: Event) => void;
  @bindable selectquerycity: (evt: Event) => void;
  @bindable clearfield: (evt: Event) => void;
  @bindable forcastchild: (evt: Event) => void;

  constructor() { }

  handleSelectQueryCity (evt: Event) {
    evt.preventDefault();
    this.selectquerycity(evt);
  }
}
