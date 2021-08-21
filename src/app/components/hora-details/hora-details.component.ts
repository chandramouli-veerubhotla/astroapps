import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Hora } from 'src/app/interfaces/sukra-hora';

@Component({
  selector: 'app-hora-details',
  templateUrl: './hora-details.component.html',
  styleUrls: ['./hora-details.component.scss']
})
export class HoraDetailsComponent implements OnInit {

  @Input() hora!: Hora;

  constructor() { }

  ngOnInit(): void {
  }
}
