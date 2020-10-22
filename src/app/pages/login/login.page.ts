import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

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

  constructor(private usersService: UsersService) { }

  loginUser = {
    email: 'fb.argenis@gmail.com',
    password: '01230'
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

  login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    console.log(this.loginUser);
    this.usersService.login(this.loginUser.email, this.loginUser.password);
  }

  singUp(fSingUp: NgForm) {
    console.log(fSingUp.valid);
  }

  gotoSlide(slide: number) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slide);
    this.slides.lockSwipes(true);
  }
}
