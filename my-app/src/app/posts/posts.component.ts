import { Component, OnInit } from '@angular/core';
import { postService } from '../service/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  posts: any = [];

  constructor(private router: Router, private postService: postService){}
  
  ngOnInit() {
    this.postService.getAll().subscribe(posts => {
      this.posts = posts
      console.log(posts)
    })
  }
}
