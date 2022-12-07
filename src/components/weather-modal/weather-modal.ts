import { bindable } from 'aurelia-framework';

export class WeatherModal {
  @bindable current: any;
  @bindable citychild: string;
  @bindable showmodal: boolean;
  @bindable hidemodal: () => void;
  
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
