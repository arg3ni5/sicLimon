import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  posts: Post[] = [];

  constructor(private postService: PostsService) {
    this.loadData();
  }
  loadData(event?) {
    this.postService.getPosts().subscribe(resp => {
      console.log(resp);      
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();
      }
    });
  }

}
