import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

declare var window: any;

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
    private geolocation: Geolocation,
    private camera: Camera,
    private imagePicker: ImagePicker) { }

  async crearPost() {
    const created = await this.postsService.createPost(this.post);
    this.post = {
      mensaje: "",
      coords: null,
      position: false
    };
    this.tempImages = [];
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

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.processImage(options);
  }

  libreria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.processImage(options);
  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.postsService.uploadImage(imageData)
      this.tempImages.push(img);
    }, (err) => { console.log(err); });
  }

  picker() {
    const options = {
      maximumImagesCount: 10,
      width: 800
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        const img = window.Ionic.WebView.convertFileSrc(results[i]);
        this.postsService.uploadImage(results[i])
        this.tempImages.push(img);
      }
    }, (err) => { console.log(err); });
  }
}
