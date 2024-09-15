import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vibration} from '@ionic-native/vibration/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-wake-on-lan',
  templateUrl: './wake-on-lan.component.html',
  styleUrls: ['./wake-on-lan.component.scss'],
})
export class WakeOnLanComponent implements OnInit {

  @Input() apiUrl: string;
  @Input() title: string;
  @Input() btnText: string;

  constructor(private httpClient: HttpClient,
              private vibration: Vibration,
              private toastController: ToastController) { }

  ngOnInit() {}

  async onClick() {
    const toast = await this.toastController.create({
      duration: 1500,
      position: 'bottom',
      cssClass: 'toast-custom-bottom'
    });

    this.vibration.vibrate(300);
    this.httpClient.get(this.apiUrl).subscribe({
      next: value => {
        toast.message = 'The machine has been waken';
        toast.color = 'success';
        toast.present();
      },
      error: err => {
        toast.message = 'Error on waking up the machine';
        toast.color = 'danger';
        toast.present();
      }
    });

  }
}
