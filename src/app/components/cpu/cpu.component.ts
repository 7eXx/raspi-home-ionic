import { Component, Input, OnInit } from '@angular/core';
import { CpuInfo } from '../../datastructures/system-information.datastructure';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.scss'],
})
export class CpuComponent implements OnInit {

  @Input() cpu: CpuInfo;

  constructor() { }

  ngOnInit() {}
}
