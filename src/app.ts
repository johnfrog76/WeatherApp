import { WeatherService } from './services/weather-service'
import { inject } from 'aurelia-framework';
import { List } from './interfaces/weather';

@inject(WeatherService)
export class App {
  city = 'New York'; // added default city
  forcastlist: List[] = [];
  isLoading: boolean = true;
  showCelsius: boolean = true;
  emptyMessage: string = 'there is no weather data.';
  emptyMesasageMore: boolean = true;
  constructor(private weatherService: WeatherService) {}

  activate() {
    this.forecast();
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
      // console.log(forecast.list);
      //@ts-ignore
      this.forcastlist = forecast.list;
      this.isLoading = false;
      this.showCelsius = false;
    }).catch(error => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
