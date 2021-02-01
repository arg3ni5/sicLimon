import { Component, OnInit } from '@angular/core';
import { UiServicesService } from '../../services/ui-services.service';
import { CategoriesService } from '../../services/categories.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: any = [];

  constructor(
    private categoriesService: CategoriesService,
    private UiServicesService: UiServicesService,
    private navCtrl: NavController) { }

  async ionViewWillEnter() {
    const category = await this.categoriesService.getCategory();
    if (category) {
      this.setCategory(category);
    }
  }

  ngOnInit() {    
    this.UiServicesService.presentLoading(); 
    this.categoriesService.getCategories().subscribe(categories => {
      if (categories['ok']) {
        this.categories = categories['categoryList'];
      }
      this.UiServicesService.dismissedLoading(); 
    });
  }

  async onClick(category: any) {
    let buttons = [];
    if (category['childrens']) {
      for (let c of category['childrens']) {
        buttons.push(
          {
            text: c['name'],
            handler: () => {
              this.setCategory(c);
            }
          })
      }
      this.UiServicesService.presentActionSheet({
        header: 'Elija una Sub Categoria',
        cssClass: 'my-custom-class',
        buttons
      });
    }
  }

  setCategory(category: any) {
    if (category) {
      this.categoriesService.setCategory(category._id);
    }
    this.navCtrl.navigateRoot('tabs/tab2/report', { animated: true });
  }
  
  clearCategory() {
    this.categoriesService.clearCategory();
  }
}
