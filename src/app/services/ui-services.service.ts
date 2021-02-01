import { Injectable } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController) { }

  private loading: any;

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading(message: string = 'Cargando...', duration: number = 0) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
      duration: duration
    });
    await this.loading.present();
  }

  dismissedLoading() {
    if (this.loading) {      
      this.loading.dismiss();
    }
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
