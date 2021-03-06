import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import { UiServicesService } from '../../services/ui-services.service';
import { PostsService } from 'src/app/services/posts.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  usuario: Usuario;

  constructor(
    private usersService: UsersService,
    private uiServices: UiServicesService,
    private postsService: PostsService
  ) { }

  logout() {
    this.uiServices.presentLoading('Cerrando Sesion', 1500);
    this.postsService.pagePosts = 0;
    this.usersService.logout();
  }

  async updateUser(fUpdate: NgForm) {
    if (fUpdate.invalid) { return; }

    const updated = await this.usersService.updateUser(this.usuario);

    if (updated) {
      //Toads con mensaje actualizado
      this.uiServices.presentToast('Registro Actualizado');
    } else {
      // Toads con el error
      this.uiServices.presentToast('No se puedo Actualizar');
    }
  }

  ngOnInit() {
    this.usuario = this.usersService.getUser();
  }
}
