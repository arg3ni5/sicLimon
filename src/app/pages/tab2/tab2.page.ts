import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  loadingGeo: boolean = false;

  post = {
    mensaje: "",
    coords: null,
    position: false
  }

  constructor(private postsService: PostsService,
              private navCtrl: NavController,
              private geolocation: Geolocation) { }

  async crearPost() {
    const created = await this.postsService.createPost(this.post);
    this.post = {
      mensaje: "",
      coords: null,
      position: false
    };
    this.navCtrl.navigateRoot('main/tabs/tab1');
  }
  getGeo() {
    console.log(this.post);
    this.loadingGeo = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadingGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
      
    }).catch((error) => {
      this.loadingGeo = false;
      console.log('Error getting location', error);
     });
  }
}
