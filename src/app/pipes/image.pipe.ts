import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
const URL = environment.url;
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, userId: string): string {
    console.log(`${URL}/posts/image/${userId}/${img}`);    
    return `${URL}/posts/image/${userId}/${img}`;
  }

}
