import { Component, OnInit } from '@angular/core';
import { AstroTimeService } from './services/astro-time.service';


export class Time {

  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  greeting: string = '';
  currentTime: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.currentTime = new Date().getHours()
    if (this.currentTime < 12) {
      this.greeting = 'Good morning'
    } else if (this.currentTime < 18) {
      this.greeting = 'Good Afternoon'
    } else {
      this.greeting = 'Good Evening'
    }
  }
}
