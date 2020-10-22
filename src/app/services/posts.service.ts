import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts: number = 0;

  constructor(private http: HttpClient) { }

  getPosts() {
    this.pagePosts++;
    return this.http.get<ResponsePost>(`${URL}/posts/?page=${this.pagePosts}`)
  }
}
