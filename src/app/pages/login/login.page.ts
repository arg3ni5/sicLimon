import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { UiServicesService } from '../../services/ui-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  }

  constructor(
    private usersService: UsersService,
    private navCtrl: NavController,
    private uiServicesService: UiServicesService) { }

  loginUser = {
    email: 'fb.argenis@gmail.com',
    password: '0123'
  }
  registerUser: Usuario = {
    email: 'test123@gmail.com',
    nombre: 'test',
    password: '123456'
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  selectAvatar(avatar: any) {
    this.avatars.forEach(av => av.selected = false);
    avatar.selected = true;
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {return;}
    const valid = await this.usersService.login(this.loginUser.email, this.loginUser.password);
    if (valid) {
      // navegar
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta
      this.uiServicesService.presentAlert('Usuario y/o contraseña no son correctos.');
    }
  }

  async singUp(fSingUp: NgForm) {
    if (fSingUp.invalid) {return;}
    const valid = await this.usersService.singUp(this.registerUser);
    if (valid) {
      // navegar
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta
      this.uiServicesService.presentAlert('Correo ya registrado');
    }
  }

  gotoSlide(slide: number) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slide);
    this.slides.lockSwipes(true);
  }
}
