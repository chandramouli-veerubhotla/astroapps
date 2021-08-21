import { Inject, Injectable } from '@angular/core';
import { coordinateInfo } from '../interfaces/sukra-hora';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    @Inject('environment') private env: any
  ) { }

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

  public getKnownLocations(): Array<coordinateInfo> {
    return this.env.knownLocations;
  }

  public getCoordinateInfoByLatLong(latitude: number, longitude: number): coordinateInfo | null {
    let knownLocations = this.getKnownLocations()
    let foundLocation = null;
    for (let idx=0; idx < knownLocations.length; idx++) {
      if (latitude == knownLocations[idx].latitude && longitude == knownLocations[idx].longitude) {
        foundLocation = knownLocations[idx]
        break   
      }
    }

    return foundLocation;
  }

  public getCoordinateInfoByName(name: string): coordinateInfo | null {
    let knownLocations = this.getKnownLocations()
    let foundLocation = null;
    for (let idx=0; idx < knownLocations.length; idx++) {
      if (name == knownLocations[idx].name) {
        foundLocation = knownLocations[idx]
        break
      }
    }

    return foundLocation;
  }
}
