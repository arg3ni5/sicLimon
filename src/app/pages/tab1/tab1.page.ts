import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UiServicesService } from '../../services/ui-services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  posts: Post[] = [];
  filtro = {}
  estados = [
    { id: 'ASSIGNED_ST', name: 'Asignado' },
    { id: 'PENDING_ST', name: 'Procesando' },
    { id: 'CLOSE_ST', name: 'Cerrado' },
    { id: 'COMPLETE_ST', name: 'Resuelto' },
  ];

  disabled: boolean = false;

  constructor(
    private postService: PostsService,
    private uiServices: UiServicesService) { }

  ngOnInit() {
    this.postService.getCountCategories().subscribe(res => {
      for (const estado of res['estados']) {
        for (const est of this.estados) {
          if (est.id == estado._id) {
            est['count'] = estado['count'];
          }
        }
      }
    });
    this.loadData();
    this.postService.newPost.subscribe((post: Post) => {
      this.posts.unshift(post);
    })
  }

  setState(estado: string) {
    this.filtro['estado'] = estado;
    this.doRefresh();
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
    this.uiServices.presentLoading();
    this.postService.getPosts(pull, this.filtro['estado']).subscribe(resp => {
      this.uiServices.dismissedLoading();
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
