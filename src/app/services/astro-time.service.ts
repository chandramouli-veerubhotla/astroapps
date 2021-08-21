import { Injectable } from '@angular/core';
import { Time } from './time';
import { SukraHora, Hora, coordinateInfo } from '../interfaces/sukra-hora';

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

  public calcDayTime(latitude: number, longitude: number, date: Date) {
    // day time is calculated b/w same date sunrise and sunset
    let sunrise = this.sunrise(latitude, longitude, date)
    let sunset = this.sunset(latitude, longitude, date)

    return {'from': sunrise, 'diff': this.diffTime(sunset, sunrise)}
  }

  public calcNightTime(latitude: number, longitude: number, date: Date) {
    // night time is calculated b/w tomorrow sunrise and today's sunset
    let nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)

    let nextSunrise = this.sunrise(latitude, longitude, nextDate)
    let sunset = this.sunset(latitude, longitude, date)

    return {'from': sunset, 'diff': this.diffTime(nextSunrise, sunset)}
  }

  public morningHoras(info: coordinateInfo, date: Date): Array<Hora> {
    let onlyDate = this.clearTime(new Date(date))

    // calculate day time
    let dayTimeDetails = this.calcDayTime(info.latitude, info.longitude, onlyDate)

    // divide time to 30 hora
    let horaMilliSeconds = Math.ceil(dayTimeDetails.diff.totalMilliSeconds / 30)
    let currentMilliSeconds = dayTimeDetails.from.getTime()

    let resp = Array<Hora>();
    for (let idx = 0; idx < 30; idx++) {
      // create new date object for each hora
      let startHora = new Date(currentMilliSeconds + (horaMilliSeconds * idx))
      let endHora = new Date(currentMilliSeconds + (horaMilliSeconds * (idx+1)))

      resp.push({'id': idx, 'start': startHora, 'end': endHora})
    }
    return resp
  }


  public nightHoras(info: coordinateInfo, date: Date): Array<Hora> {
    let onlyDate = this.clearTime(new Date(date))

    // calculate night time
    let nightTimeDetails = this.calcNightTime(info.latitude, info.longitude, onlyDate)

    // divide time to 30 hora
    let horaMilliSeconds = Math.ceil(nightTimeDetails.diff.totalMilliSeconds / 30)
    let currentMilliSeconds = nightTimeDetails.from.getTime()

    let resp = Array<Hora>();
    for (let idx = 0; idx < 30; idx++) {
      // create new date object for each hora
      let startHora = new Date(currentMilliSeconds + (horaMilliSeconds * idx))
      let endHora = new Date(currentMilliSeconds + (horaMilliSeconds * (idx+1)))

      resp.push({'id': idx, 'start': startHora, 'end': endHora})
    }
    return resp
  }
}
