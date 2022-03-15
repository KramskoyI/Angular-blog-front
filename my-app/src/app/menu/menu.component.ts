import { Component, OnInit } from '@angular/core';
import { userService } from '../service/user.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  user: any
  isLoggedIn: Observable<any>
  constructor(private userService: userService) {
    this.isLoggedIn = userService.isLoggedIn()
  }
  ngOnInit() {
    this.userService.isLoginSubject.subscribe((user)=> {
      this.user = user
      console.log('this is user in menu', this.user)
    })
    
  }

  logOut() {
    this.userService.logOut()
  }
}
