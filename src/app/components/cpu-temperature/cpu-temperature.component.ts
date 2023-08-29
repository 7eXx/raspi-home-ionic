import {Component, Input, OnInit} from '@angular/core';
import {CpuInfo} from '../../datastructures/system-information.datastructure';

@Component({
  selector: 'app-cpu-temperature',
  templateUrl: './cpu-temperature.component.html',
  styleUrls: ['./cpu-temperature.component.scss'],
})
export class CpuTemperatureComponent implements OnInit {

  @Input() cpu: CpuInfo;

  constructor() { }

  ngOnInit() {}

}
