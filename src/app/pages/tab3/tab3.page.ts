import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  usuario: Usuario;

  constructor(private usersService: UsersService) { }
  logout() {
  }

  ngOnInit() {
    this.usuario = this.usersService.getUser();
    console.log(this.usuario);

  }
}
