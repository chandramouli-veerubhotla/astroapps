import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private titleService: Title,
    private _snackBarService: MatSnackBar) { }

  public setTitle(title: string): void {
    this.titleService.setTitle(title)
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public log(message: string): void {
    console.log(message)
  }

  public informUser(message: string): void {
    this._snackBarService.open(message, 'OK', {duration: 2000});
  }


}
