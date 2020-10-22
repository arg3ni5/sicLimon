import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  selectAvatar(avatar: any) {
    this.avatars.forEach(av => av.selected = false);
    avatar.selected = true;
  }

  login(fLogin: NgForm) {
    console.log(fLogin.valid);
  }

  singUp(fSingUp: NgForm) {
    console.log(fSingUp.valid);
  }

}
