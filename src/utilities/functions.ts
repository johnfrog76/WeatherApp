import date from 'date-and-time';

// export type rollupForcastType = {
//   dt: number;
//   title: string;
//   items: []
// }

export const rollupForecast = (forecastList) => {
    
  let nextSixDays = [];
  nextSixDays.length = 6;
  nextSixDays.fill(false);

  nextSixDays = nextSixDays.map((_, idx) => {
    let midnight;
    
    if (idx === 0) {
      midnight = new Date().setHours(0, 0, 0, 0);
    } else {
      midnight = new Date().setHours(24 * idx, 0, 0, 0);
    }
    return midnight;
  });

  nextSixDays = nextSixDays.map((item, idx, arr) => {
    let retItems = [];
    let dateObj = new Date(item);
    
    if (idx < arr.length - 1) {
      //@ts-ignore;
      retItems = forecastList.filter(f => f.dt * 1000 > item && f.dt * 1000 < arr[idx + 1]);
    } else {
      //@ts-ignore;
      retItems = forecastList.filter(f => f.dt * 1000 > item);
    }
    
  
    return {
      dt: item,
      title: date.format(dateObj, 'dddd, MMMM DD'),
      items: retItems,
      expanded: idx === 0 ? true : false
    };

  });

  return nextSixDays;
}

