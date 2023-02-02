import { Component, Input, OnInit } from '@angular/core';
import { MemoryInfo } from '../../datastructures/system-information.datastructure';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
})
export class MemoryComponent implements OnInit {

  @Input() memory: MemoryInfo;

  constructor() { }

  ngOnInit() {}

}
