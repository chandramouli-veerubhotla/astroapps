import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // get location of the device using device sensors
  public getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve(resp)
      }, error => {
        reject(error)
      })
    })
  }

  public log(message: string): void {
    console.log(message)
  }


}
