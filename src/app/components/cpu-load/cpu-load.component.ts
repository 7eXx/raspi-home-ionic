import { Component, Input, OnInit } from '@angular/core';
import { CpuInfo } from '../../datastructures/system-information.datastructure';

@Component({
  selector: 'app-cpu-load',
  templateUrl: './cpu-load.component.html',
  styleUrls: ['./cpu-load.component.scss'],
})
export class CpuLoadComponent implements OnInit {

  @Input() cpu: CpuInfo;

  constructor() { }

  ngOnInit() {}
}
