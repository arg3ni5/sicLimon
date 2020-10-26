import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsersService } from './users.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts: number = 0;
  ;

  constructor(private http: HttpClient, private usersService: UsersService) { }

  getPosts(pull: boolean = false) {
    if (pull) {
      this.pagePosts = 0;
    }
    this.pagePosts++;
    return this.http.get<ResponsePost>(`${URL}/posts/?page=${this.pagePosts}`)
  }

  createPost(post) {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.usersService.token
      });

      this.http.post(`${URL}/posts`, post, { headers })
        .subscribe(resp => {
          console.log(resp);

          // if (resp['ok']) {
          //   resolve(true);
          // }
          // else {
          //   resolve(false);
          // }

        });
    })
  }
}
