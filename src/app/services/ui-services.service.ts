import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) { }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }


}
