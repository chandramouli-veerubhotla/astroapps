import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { coordinateInfo } from 'src/app/interfaces/sukra-hora';
import { BhargavaSiddantamDayComponent } from '../bhargava-siddantam-day/bhargava-siddantam-day.component';

@Component({
  selector: 'app-edit-basic',
  templateUrl: './edit-basic.component.html',
  styleUrls: ['./edit-basic.component.scss']
})
export class EditBasicComponent {

  location!: coordinateInfo;
  date!: Date;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {'location': coordinateInfo, 'date': Date, 'available_locations': Array<coordinateInfo>},
    private parentRef: MatBottomSheetRef<BhargavaSiddantamDayComponent>
    ) {
      this.location = data.location
      this.date = data.date
    
   }

   changeLocation(location: coordinateInfo) {
    this.location = location
   }

   changeDate(date: Date) {
     this.date = date
   }

   send() {
    this.parentRef.dismiss({'location': this.location, 'date': this.date})
   }
}
