import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  post = {
    mensaje: "",
    coords: null,
    position: false
  }

  constructor(private postsService : PostsService, private navCtrl : NavController) { }

  async crearPost() {
    const created = await this.postsService.createPost(this.post);
    this.post = {
      mensaje: "",
      coords: null,
      position: false
    };
    this.navCtrl.navigateRoot('main/tabs/tab1');
  }
}
