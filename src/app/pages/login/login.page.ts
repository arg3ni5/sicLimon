import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { UiServicesService } from '../../services/ui-services.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  constructor(
    private usersService: UsersService,
    private navCtrl: NavController,
    private uiServices: UiServicesService) { }

  loginUser = {
    email: '',
    password: ''
  }
  registerUser: Usuario = {
    email: '',
    nombre: '',
    password: ''
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }

    this.uiServices.presentLoading();
    const valid = await this.usersService.login(this.loginUser.email, this.loginUser.password);
    if (valid) {
      // navegar
      this.navCtrl.navigateRoot('tabs/tab1', { animated: true });
      this.uiServices.dismissedLoading();
    } else {
      // mostrar alerta
      this.uiServices.dismissedLoading();
      this.uiServices.presentAlert('Usuario y/o contraseña no son correctos.');
    }
  }

  async singUp(fSingUp: NgForm) {
    if (fSingUp.invalid) { return; }
    const valid = await this.usersService.singUp(this.registerUser);
    if (valid) {
      // navegar
      this.navCtrl.navigateRoot('tabs/tab1', { animated: true });
    } else {
      // mostrar alerta
      this.uiServices.presentAlert('Correo ya registrado');
    }
  }

  gotoSlide(slide: number) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slide);
    this.slides.lockSwipes(true);
  }
}
