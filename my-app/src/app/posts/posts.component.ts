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
  posts: any = [];
  

  isLoggedIn: Observable<any>

  constructor(private router: Router, private postService: postService, private userService: userService){  
    this.isLoggedIn = userService.isLoggedIn()
  }
  

  likePost(element: any): any {
    console.log('element mas', element)
  }
  
  ngOnInit() {
    this.userService.isLoginSubject.subscribe((user)=> {
      this.user = user
    })
    this.postService.getAll().subscribe(posts => {
      this.posts = posts
    })

  }
}
