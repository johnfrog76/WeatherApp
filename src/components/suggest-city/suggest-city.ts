import { bindable } from 'aurelia-framework';
import { iCity } from '../../interfaces/city/city';

export class SuggestCity {
  @bindable citychild: string;
  @bindable querycity: string;
  @bindable queryresults: iCity[];
  @bindable querycities: (evt) => void;
  @bindable trapkeys: (evt: Event) => void;
  @bindable selectquerycity: (evt: Event) => void;
  @bindable clearfield: (evt: Event) => void;
  @bindable forecastchild: (evt: Event) => void;

  constructor() { }

  handleSelectQueryCity (evt: Event) {
    evt.preventDefault();
    this.selectquerycity(evt);
  }

  handleQueryCity (evt: any) {
    
    evt.preventDefault();
    if (this.querycity === this.citychild && this.citychild !== '') {
      if (evt.key.toLowerCase() === 'enter') {
        this.forecastchild(evt);
      }
    } else {
      this.querycities(evt);
    }
  }
}
