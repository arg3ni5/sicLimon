import { Injectable } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetController: ActionSheetController) { }

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
      position: 'top',
      duration: 1500
    });
    toast.present();
  }


  async presentActionSheet(options) {
    if (options['buttons'] && options['buttons'].length > 0) {
      options['buttons'].push({
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      })
    }
    else {
      this.presentAlert(options['toast'] || 'No hay elementos');
      return;
    }
    const actionSheet = await this.actionSheetController.create(
      {
        header: options['header'],
        cssClass: options['cssClass'],
        buttons: options['buttons']
      });
    await actionSheet.present();
  }
}
