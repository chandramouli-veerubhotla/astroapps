import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Hora, coordinateInfo } from 'src/app/interfaces/sukra-hora';
import { AstroTimeService } from 'src/app/services/astro-time.service';
import { CommonService } from 'src/app/services/common.service';
import { LocationService } from 'src/app/services/location.service';
import { EditBasicComponent } from '../edit-basic/edit-basic.component';


@Component({
  selector: 'app-bhargava-siddantam-day',
  templateUrl: './bhargava-siddantam-day.component.html',
  styleUrls: ['./bhargava-siddantam-day.component.scss']
})
export class BhargavaSiddantamDayComponent implements OnInit {

  date!: Date;
  localDate!: any;

  selectedLocation!: coordinateInfo;

  latitude!: number;
  longitude!: number;

  locations!: Array<coordinateInfo>;
  isDay: boolean = true;

  // hora details
  horaDetails!: Array<Hora>;

  sunrise!: Date;
  sunset!: Date;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private astroTimeService: AstroTimeService,
    private locationService: LocationService,
    private bottomSheet: MatBottomSheet
    ) { 
      this.locations = this.locationService.getKnownLocations()
    }

  ngOnInit(): void {

    let coordinates: coordinateInfo = {'latitude': -1, 'longitude': -1, 'name': 'not-valid'};

    // read latitude, longitude and date
    let latitude: string | number | null = this.route.snapshot.paramMap.get('latitude')
    let longitude: string | number | null = this.route.snapshot.paramMap.get('longitude')
    let date: string | Date | null  = this.route.snapshot.paramMap.get('date')


    if (latitude == null || longitude == null || date == null) {
      if (this.locations.length > 0) {
        coordinates = this.locations[0]
        this.date = new Date()
      } 
    } else {
      latitude = Number(latitude)
      longitude = Number(longitude)
      this.date = new Date(String(date))

      let info = this.locationService.getCoordinateInfoByLatLong(latitude, longitude)
      if (info == null) {
        coordinates = {'latitude': latitude, 'longitude': longitude, 'name': 'custom'}
        this.locations.push(coordinates)
      } else {
        coordinates = info
      }
    }

    this.selectedLocation = coordinates;
    this.calculate()

    // set title for the page
    this.commonService.setTitle('Details - Astroapps')
  }

  calculate() {
    this.sunrise = this.astroTimeService.sunrise(this.selectedLocation.latitude, this.selectedLocation.longitude, this.date)
    this.sunset = this.astroTimeService.sunset(this.selectedLocation.latitude, this.selectedLocation.longitude, this.date)

    if (this.isDay) {
      this.horaDetails = this.astroTimeService.morningHoras(this.selectedLocation, this.date)
      this.commonService.informUser('calculated morning hora details')
    } else {
      this.horaDetails = this.astroTimeService.nightHoras(this.selectedLocation, this.date)
      this.commonService.informUser('calcuated night hora details')
    }
  }

  onValChange(toggle: MatSlideToggleChange) {
    this.isDay = !toggle.checked;
    this.calculate()
  }

  change() {
    this.bottomSheet.open(EditBasicComponent, {
      data: {'location': this.selectedLocation, 'date': this.date, 'available_locations': this.locations}
    }).afterDismissed().subscribe((data) => {
      if (data) {
        this.selectedLocation = data['location']
        this.date = data['date']
        this.calculate()
      }
    })
  }

}
