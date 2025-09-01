import {Component, Input, OnInit} from '@angular/core';
import {HumidityInfo} from '../../datastructures/environment-information.datastructure';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss'],
})
export class HumidityComponent implements OnInit {

  @Input() humidity: HumidityInfo;

  minRange = 0;
  maxRange = 100;

  constructor() { }

  ngOnInit() {}

}
