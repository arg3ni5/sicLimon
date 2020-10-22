import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string = null;
  constructor(private http: HttpClient, private storage: Storage) { }

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/user/login`, data).subscribe(resp => {
        if (resp['ok']) {
          this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          reject(false);
        }
      })
    })

  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }
}
