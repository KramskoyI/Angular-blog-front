import { Component} from '@angular/core';
import { userService } from '../service/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{

  constructor(private userService: userService) {}

  logOut() {
    console.log(1)
    this.userService.logOut()
  }
}
