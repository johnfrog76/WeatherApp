import { WeatherService } from './services/weather-service'
import { inject } from 'aurelia-framework';
import { List } from './interfaces/weather';
import date from 'date-and-time';

@inject(WeatherService)
export class App {
  city = 'New York'; // added default city
  forcastlist: List[] = [];
  isLoading: boolean = true;
  showCelsius: boolean = true;
  emptyMessage: string = 'there is no weather data.';
  emptyMesasageMore: boolean = true;
  showModal: boolean = true;
  currentItem: any = {};
  constructor(private weatherService: WeatherService) {}

  activate() {
    this.forecast();
  }

  displayModal(idx: number) {
    this.currentItem = this.forcastlist[idx || 0];
    this.showModal = true;
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

  hideModal() {
    this.showModal = false;
  }

  clearField (evt) {
    // console.log(evt)
    this.city = '';
    this.forcastlist = [];
  }

  toggleTempFormat () {
    this.showCelsius = !this.showCelsius;
  }

  forecast() {
    let city = this.city //get the city from user
    this.isLoading = true;
    this.weatherService.getForecast(city).then(forecast => {
      //this.forcastlist = forecast as List;

      //@ts-ignore
      console.log(forecast.list);
      //@ts-ignore
      this.forcastlist = forecast.list.map(item => {
        var dt = new Date(item.dt * 1000);

        return {
          ...item,
          dt_txt: date.format(dt, 'dddd, MM/DD - hh:mm A')

        }
      });
      this.isLoading = false;
      this.showCelsius = false;
    }).catch(error => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
