import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { UiServicesService } from '../../services/ui-services.service';
import { CategoriesService } from '../../services/categories.service';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  category: any = { parent: {} };
  tempImages: string[] = [];
  loadingGeo: boolean = false;

  post = {
    mensaje: "",
    direccion: "",
    coords: null,
    position: false,
    category: null
  }

  constructor(
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private uiServices: UiServicesService,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private camera: Camera,
    private imagePicker: ImagePicker) { }

  async ngOnInit() {
    if (this.category['_id'] == undefined) {
      this.category = await this.categoriesService.getCategory();
    }
  }

  async ionViewWillEnter() {
    if (this.category['_id'] == undefined) {
      this.category = await this.categoriesService.getCategory();

      if (this.category == undefined || this.category['_id'] == undefined) {
        this.navCtrl.navigateRoot('tabs/tab2/categories');
        return;
      }

      this.post['category'] = this.category;
      
      this.postsService.getImgsTemp().then((imgs) => {
        this.tempImages = imgs;
      });
    }
    else{
      this.post['category'] = this.category;
    }
  }

  async crearPost() {
    const created = await this.postsService.createPost(this.post);
    this.post = {
      mensaje: "",
      direccion: "",
      coords: null,
      position: false,
      category: null
    };
    this.category = { parent: {} };
    this.tempImages = [];
    this.categoriesService.clearCategory();
    this.navCtrl.navigateRoot('tabs/tab1');
  }
  cancel() {
    this.categoriesService.clearCategory();
    this.navCtrl.navigateRoot('tabs/tab2/categories', { animated: true });
  }

  getGeo() {
    if (this.post.position === true) {
      this.loadingGeo = true;
      this.geolocation.getCurrentPosition().then((resp) => {
        this.loadingGeo = false;
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        this.post.coords = coords;
        this.uiServices.presentToast('Coordenadas Localizadas');
      }).catch((error) => {
        this.loadingGeo = false;
        this.post.position = false;
        console.log('Error getting location', error);
        this.uiServices.presentToast('Error obteniendo localización');
      });
    }
  }

  camara() {
    if (this.tempImages.length == 3) {      
      this.uiServices.presentToast('No se pueden agregar mas de 3 imagenes');
      return;
    }
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
    if (this.tempImages.length == 3) {      
      this.uiServices.presentToast('No se pueden agregar mas de 3 imagenes');
      return;
    }
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
    if (this.tempImages.length == 3) {      
      this.uiServices.presentToast('No se pueden agregar mas de 3 imagenes');
      return;
    }
    const options = {
      maximumImagesCount: 3,
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
