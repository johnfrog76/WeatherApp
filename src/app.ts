import { WeatherService } from './services/weather-service'
import { inject } from 'aurelia-framework';
import { List } from './interfaces/weather';
import CITY_DATA from './utilities/cities.json';
import date from 'date-and-time';

@inject(WeatherService)
export class App {
  city = '';
  queryCity='';
  queryResults: {city: string; state: string}[] = [];
  city_list: {city: string; state: string}[] = [];
  
  forcastlist: List[] = [];
  isLoading: boolean = true;
  showCelsius: boolean = true;
  emptyMessage: string = 'there is no weather data.';
  emptyMesasageMore: boolean = true;
  showModal: boolean = false;
  currentItem: any = {};
  hasError = false;
  errorMesage = '';

  constructor(private weatherService: WeatherService) {}

  activate() {
    this.city_list = CITY_DATA;
    this.isLoading = false;
  }

  queryCities() {

    const tempResults = this.city_list.filter(c => 
          c.city.toLowerCase().indexOf(this.queryCity.toLowerCase()) !== -1);

    if (tempResults.length > 0 && tempResults.length < 10) {
      this.queryResults = tempResults.slice(0);
    } else {
      this.queryResults = [];
    }

    return true;
  }

  trapKeys(evt) {
    const target = evt.target;
    if (target.tagName === 'BUTTON' && evt.code.toLowerCase() === 'escape') {
      evt.target.closest('.suggest-city-control').children[0].focus();
      return true;
    } 

    if (target.tagName === 'SPAN') {
      const tabStopEles = document.getElementsByClassName('tabstop')
      const btnEles = target.parentElement.getElementsByTagName('BUTTON');
      const firstBtnEl = btnEles[0];
      const lastBtnEl = btnEles[btnEles.length - 1];
  
      if (evt.code.toLowerCase() === 'tab' && evt.type === 'keyup') {
        if (evt.target.id === 'tabstop1' && evt.shiftKey === true) {
          lastBtnEl.focus();
        } else {
          firstBtnEl.focus();
        }
      } 
     }
    return true;
  }

  selectQueryCity(evt) {
    evt.preventDefault();
    const inputEl: any = document.querySelector('.suggest-city-control > input');
    let cityText = '';

    if (evt.target.tagName === 'SPAN') {
      cityText = evt.target.parentElement.children[0].innerText;
    } else {
      cityText = evt.target.children[0].innerText;
    }

    inputEl.focus();
    this.queryResults = [];
    this.queryCity = '';
    this.queryCity = cityText;
    this.city = cityText;
  }

  displayModal(idx: number) {
    this.currentItem = this.forcastlist[idx || 0];
    this.showModal = true;
    document.querySelector('.show');
  }

  handleModal(evt, idx) {
    if (evt.type === 'keydown' && evt.key.toLowerCase() === 'enter') {
      this.displayModal(idx);
      setTimeout(() => {
        const ele: any = document.querySelector('.close');
        ele.focus();
      })
    } else {
      return true;
    }
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
    this.city = '';
    this.queryCity = '';
    this.queryResults = [];
    this.forcastlist = [];
  }

  toggleTempFormat () {
    this.showCelsius = !this.showCelsius;
  }

  forecast() {
    let city = this.city;
    this.isLoading = true;
    this.weatherService.getForecast(city).then(forecast => {
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
    }).catch(err => {
      console.error(err)
      this.isLoading = false;
    });
  }
}
