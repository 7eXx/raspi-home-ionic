import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  title = 'Settings';

  constructor() { }

  ngOnInit() {
  }

  onClickBack() {
    console.log('on click back');
  }
}
