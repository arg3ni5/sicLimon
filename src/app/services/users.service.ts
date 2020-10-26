import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string = null;
  usuario: Usuario = {};
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController) { }

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/login`, data).subscribe(resp => {
        if (resp['ok']) {
          this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      })
    })
  }

  singUp(user: Usuario) {
    return new Promise((resolve) => {
      this.http.post(`${URL}/user/create`, user).subscribe(resp => {
        if (resp['ok']) {
          this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      })
    })
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validateToken(): Promise<boolean> {
    await this.loadToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user`, { headers }).subscribe(resp => {
        if (resp['ok']) {
          this.usuario = resp['usuario'];
          resolve(true);
        }
        else {
          this.navCtrl.navigateRoot('login');
          resolve(false);
        }
      });
    })
  }

  getUser() {
    if (!this.usuario._id) {
      this.validateToken();
    }
    return { ... this.usuario };
  }

  updateUser(usuario: Usuario) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
  
      this.http.post(`${URL}/user/update`, usuario, { headers })
      .subscribe(resp => {

        if (resp['ok']) {
          this.saveToken(resp['token']);
          resolve(true);
        }
        else {
          this.navCtrl.navigateRoot('login');
          resolve(false);
        }
        
      });
    })
  }
}
