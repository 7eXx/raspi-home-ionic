import {Component, Input, OnInit} from '@angular/core';
import {TemperatureInfo} from '../../datastructures/environment-information.datastructure';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {

  @Input() temperature: TemperatureInfo;

  minRange = -20;
  maxRange = 70;

  constructor() { }

  ngOnInit() {
  }

}
