import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  posts: Post[] = [];
  disabled: boolean = false;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.loadData();
    this.postService.newPost.subscribe((post: Post) => {
      this.posts.unshift(post);
    })
  }

  // ionViewWillEnter() {
  //   this.loadData(undefined, true);
  //   this.posts = [];
  //   this.disabled = false;
  // }

  doRefresh(event?: any) {
    this.loadData(event, true);
    this.posts = [];
    this.disabled = false;
  }
  loadData(event?: any, pull: boolean = false) {
    this.postService.getPosts(pull).subscribe(resp => {
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();

        if (resp.posts.length === 0) {
          this.disabled = true;
        }
      }
    });
  }

}
