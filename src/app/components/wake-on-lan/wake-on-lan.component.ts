import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-wake-on-lan',
  templateUrl: './wake-on-lan.component.html',
  styleUrls: ['./wake-on-lan.component.scss'],
})
export class WakeOnLanComponent implements OnInit {

  @Input() apiUrl: string;
  @Input() title: string;
  @Input() btnText: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {}

  onClick() {
    this.httpClient.get(this.apiUrl).subscribe();
  }
}
