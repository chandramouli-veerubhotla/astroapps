import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DayInputComponent } from './day-input/day-input.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BhargavaSiddantamFormComponent } from './components/bhargava-siddantam-form/bhargava-siddantam-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DayInputComponent,
    DashboardComponent,
    BhargavaSiddantamFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
