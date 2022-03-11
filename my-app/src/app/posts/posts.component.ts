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
  show:boolean = true
  none:boolean = false
  showL:boolean = false
  noneL:boolean = true

  constructor(private router: Router, private postService: postService, private userService: userService){  }
  
  

  likePost(element: any): any {
    console.log('element mas', element)
  }
  ngOnInit() {
    
    this.user = this.userService.getST()
    console.log('this is user', this.user)
    this.postService.getAll().subscribe(posts => {
      this.posts = posts
    })

    // if(this.userAuth) {
    //   // this.posts.forEach(this.likePost)
    //   console.log(this.userAuth)
    // } else { 
    //   console.log(this.userAuth)
    //   this.show = false
    //   this.none = true
    //   this.showL = true
    //   this.noneL = false
    // }
  }
  
  like() {
    this.show = !this.show
    this.none = !this.none
    this.showL = !this.showL
    this.noneL = !this.noneL
    console.log('like')
  }

  

  
}
