import { Component, OnInit } from '@angular/core';
import { postService } from '../service/post.service';
import {Router} from '@angular/router';
import { userService } from '../service/user.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  user: any
  posts: any = []
  start: number = 0
  end: number = 3
  isLoggedIn: Observable<any>
  page: number = 1
  show:boolean = false
  none:boolean = true

  

  constructor(private router: Router, private postService: postService, private userService: userService){  
    this.isLoggedIn = userService.isLoggedIn()
  }
  
  ngOnInit() {
    this.userService.isLoginSubject.subscribe((user)=> {
      this.user = user
    })
    this.postService.getAll().subscribe(posts => {
      this.posts = posts.slice(this.start, this.end)
    })

  }
  counterUp( page: number): number {
    this.page = page + 1
    return this.page
  }
  counterDown( page: number): number {
    this.page = page - 1
    return this.page
  }
  next() {
    this.counterUp(this.page)
    // this.page = this.page + 1
    
    this.start = this.start + 3
    this.end = this.end + 3
    this.postService.getAll().subscribe(posts => {
      this.posts = posts.slice(this.start, this.end)
    })
    if(this.page > 1) {
      this.show = true
      this.none = false
    }
    console.log(this.start, this.end)
  }
  
  down() {
    this.counterDown(this.page)
    this.start = this.start - 3
    this.end = this.end - 3
    this.postService.getAll().subscribe(posts => {
      this.posts = posts.slice(this.start, this.end)
    })
    if(this.page > 1) {
      this.show = true
      this.none = false
    } else {
      this.show = false
      this.none = true
    }
    // if(this.page = 1) {
    //   this.show = false
    //   this.none = true
    // }
    console.log(this.start, this.end)
  }
}
