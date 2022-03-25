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
    console.log('ngOnInit menu component')
    
    this.userService.isAutheticated().subscribe((data:any) => {
      console.log('this is data menu', data)
      this.userService.isLoginSubject.next(data)
      
    })
    this.userService.isLoginSubject.subscribe((user)=> {
      this.user = user
      console.log('this is user in menu', this.user)
    })

    

    
    
  }

  logOut() {
    this.userService.logOut()
  }
}
