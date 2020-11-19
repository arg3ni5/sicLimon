import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from '../services/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanLoad {

  constructor(private categoriesService: CategoriesService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.categoriesService.validateCategory();
  }
}
