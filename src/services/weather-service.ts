import { HttpClient } from 'aurelia-http-client';
import { WeatherResponce } from '../interfaces/weather/weather';
import { autoinject } from "aurelia-framework";

@autoinject
export class WeatherService {
  constructor(private httpClient: HttpClient){
    this.httpClient.configure(config => {
      config
        .withBaseUrl('https://api.openweathermap.org/data/2.5/');
    });
  }

  getForecast(city: string) {
    const appId = '5f869c4127815ee4eb1ed4c0c8670b44';
    return new Promise((resolve, reject) => {
      this.httpClient.get('forecast?q=' + city + '&appid=' + appId).then(httpResponse=> {
        var forecast: WeatherResponce = JSON.parse(httpResponse.response); 
        setTimeout(() => {
          resolve(forecast);
        }, 1500)
      }).catch( error => {
        reject(error);
      });
    });
  }
}
