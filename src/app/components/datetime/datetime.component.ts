import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss'],
})
export class DatetimeComponent implements OnInit {

  @Input() datetime: string;

  constructor() { }

  ngOnInit() {}

}
