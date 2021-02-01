import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { UiServicesService } from './ui-services.service';
import { Category } from '../interfaces/category.interface';
import { ResponsePost } from '../interfaces/post.inteface';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  category: Category;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private uiServices: UiServicesService
  ) { }

  getCategories() {
    return this.http.get<ResponsePost>(`${URL}/category`);
  }

  async setCategory(category: Category) {
    this.category = category;
    await this.storage.set('category', category);
  }
  async setCategoryId(id: string) {
    this.category._id = id;
    await this.storage.set('category', this.category);
  }
  async loadCategory() {
    this.category = await this.storage.get('category') || null;
  }

  clearCategory() {
    this.storage.remove('category');
    this.category = undefined;
  }

  async validateCategory(): Promise<boolean> {
    await this.loadCategory();

    if (!this.category) {
      this.navCtrl.navigateRoot('/tabs/tab2/categories');
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      if (this.category) {
        this.uiServices.presentLoading();
        this.http.get<any>(`${URL}/category?id=${this.category._id}`).subscribe(res => {
          if (res['ok']) {
            this.uiServices.dismissedLoading();
            this.setCategory(res['category']);
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
    if (this.category != undefined && this.category.parent) {
      return Promise.resolve(this.category);
    }
    return new Promise((resolve) => {
      if (this.category == undefined) {
        this.loadCategory();
      }

      if (this.category && this.category._id) {
        this.http.get<any>(`${URL}/category?id=${this.category._id}`).subscribe(res => {
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
