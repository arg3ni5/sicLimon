import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsersService } from './users.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';
import { Post, ResponsePost } from '../interfaces/post.inteface';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts: number = 0;
  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
    private usersService: UsersService,
    private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false, estado: string = 'ALL') {
    if (pull) {
      this.pagePosts = 0;
    }
    this.pagePosts++;
    const headers = new HttpHeaders({
      'x-token': this.usersService.token
    });
    if (estado !== 'ALL') {
      return this.http.get<ResponsePost>(`${URL}/posts/user?page=${this.pagePosts}&state=${estado}`, { headers })
    } else {
      return this.http.get<ResponsePost>(`${URL}/posts/user?page=${this.pagePosts}`, { headers })
    }
  }
  
  getCountCategories() {
    const headers = new HttpHeaders({
      'x-token': this.usersService.token
    });
    return this.http.get<ResponsePost>(`${URL}/posts/user/count`, { headers });
  }

  createPost(post) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.usersService.token
      });

      this.http.post(`${URL}/posts`, post, { headers })
        .subscribe(resp => {
          console.log(resp);

          if (resp['ok']) {
            this.newPost.emit(resp['post']);
            resolve(true);
          }
          else {
            resolve(false);
          }
        });
    })
  }
  uploadImage(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: { 'x-token': this.usersService.token }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${URL}/posts/upload`, options)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log('error en carga de imagen: ', err));
  }
  getImgsTemp() {
    return new Promise<any[]>((resolve) => {
      const imgs = [];
      const headers = new HttpHeaders({ 'x-token': this.usersService.token });
      this.http.get(`${URL}/posts/temp`, { headers })
        .subscribe(resp => {
          if (resp['ok'] && resp['imgs']) {
            for (const img of resp['imgs']) {
              imgs.push(`${URL}/posts/image/temp/${resp['usuario']}/${img}`);
            }
            resolve(imgs);
          }
        });
    })
  }
  clearTempDir() {
    const headers = new HttpHeaders({ 'x-token': this.usersService.token });
    this.http.delete(`${URL}/posts/temp`, { headers })
      .subscribe(resp => console.log(resp));
  }
}
