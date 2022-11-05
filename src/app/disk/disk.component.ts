import { Component, Input, OnInit } from '@angular/core';
import { DiskInfo } from '../datastructures/system-information.datastructure';

@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.scss'],
})
export class DiskComponent implements OnInit {

  @Input() disk: DiskInfo;

  constructor() { }

  ngOnInit() {}

}
