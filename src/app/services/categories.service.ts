import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { UiServicesService } from './ui-services.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  category: string;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private uiServices: UiServicesService
  ) { }

  getCategories() {
    return this.http.get<ResponsePost>(`${URL}/category`);
  }

  async setCategory(category: string) {
    this.category = category;
    await this.storage.set('category', category);
  }

  async loadCategory() {
    this.category = await this.storage.get('category') || null;
  }

  clearCategory() {
    this.storage.remove('category');
    this.category = undefined;
  }

  async validateCategory(): Promise<boolean> {
    this.uiServices.presentLoading();
    await this.loadCategory();

    if (!this.category) {
      this.navCtrl.navigateRoot('/tabs/tab2/categories');
      // this.navCtrl.navigateRoot('tabs/tab2/categories', { animated: true });
      this.uiServices.dismissedLoading();
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      if (this.category) {
        this.http.get<ResponsePost>(`${URL}/category?id=${this.category}`).subscribe(res => {
          if (res['ok']) {
            this.uiServices.dismissedLoading();
            return resolve(true);
          }
          else {
            this.uiServices.dismissedLoading();
            this.category = undefined;
            return resolve(false);
          }
        });
      }
      else {
        return resolve(false);
      }
    })
  }

  getCategory() {
    return new Promise((resolve) => {
      if (!this.category) {
        this.loadCategory();
      }

      if (this.category) {
        this.http.get<ResponsePost>(`${URL}/category?id=${this.category}`).subscribe(res => {
          if (res['ok']) {
            resolve(res['category']);
          }
          else {
            resolve(undefined);
          }
        });
      }
      else {
        resolve(undefined);

      }
    })
  }

}
