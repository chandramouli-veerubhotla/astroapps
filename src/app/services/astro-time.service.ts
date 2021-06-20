import { Injectable } from '@angular/core';
import { Time } from './time';
import { SukraHora, Hora } from '../interfaces/sukra-hora';

import * as sun from 'sunrise-sunset-js';

@Injectable({
  providedIn: 'root'
})
export class AstroTimeService {

  constructor() { }

  private clearTime(d: Date): Date {
    let date = new Date(d.getTime())
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
  }

  private diffTime(s1: Date, s2: Date): Time {
    let diff = s1.getTime() - s2.getTime()
    let time = new Time()
    time = time.fromTotalMilliSeconds(diff)
    return time
  }

  public sunrise(latitude: number, longitude: number, date: Date): Date {
    let onlyDate = this.clearTime(date)
    return sun.getSunrise(latitude, longitude, onlyDate)
  }

  public sunset(latitude: number, longitude: number, date: Date): Date {
    let onlyDate = this.clearTime(date)
    return sun.getSunset(latitude, longitude, onlyDate)
  }

  public dayTime(latitude: number, longitude: number, date: Date): Time {
    // day time is calculated b/w same date sunrise and sunset
    let sunrise = this.sunrise(latitude, longitude, date)
    let sunset = this.sunset(latitude, longitude, date)

    return this.diffTime(sunset, sunrise)
  }

  public nightTime(latitude: number, longitude: number, date: Date): Time {
    // night time is calculated b/w tomorrow sunrise and today's sunset
    let nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)

    let nextSunrise = this.sunrise(latitude, longitude, nextDate)
    let sunset = this.sunset(latitude, longitude, date)

    return this.diffTime(nextSunrise, sunset)
  }

  public calcSukraHora(latitude: number, longitude: number, date: Date, isDay: boolean = true): Array<Hora> {
    let time = null;
    if (isDay) {
      time = this.dayTime(latitude, longitude, date)
    } else {
      time = this.nightTime(latitude, longitude, date)
    }

    // divide time to 30 hora
    let horaMilliSeconds = Math.ceil(time.totalMilliSeconds / 30)
    let resp = Array<Hora>();
    for (let idx = 0; idx < 30; idx++) {
      // create new date object for each hora
      let startHora = new Date(time.totalMilliSeconds + (horaMilliSeconds * idx))
      let endHora = new Date(time.totalMilliSeconds + (horaMilliSeconds * (idx+1)))

      resp.push({'id': idx, 'start': startHora, 'end': endHora})
    }
    return resp
  }
}
