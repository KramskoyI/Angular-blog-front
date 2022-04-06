import { Component, OnInit } from '@angular/core';
import { postService } from '../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-sort-tag',
  templateUrl: './sort-tag.component.html',
  styleUrls: ['./sort-tag.component.scss']
})
export class SortTagComponent implements OnInit {
  tag: any
  posts: any
  constructor(private route: ActivatedRoute, private postService: postService, private router: Router,) { route.params.subscribe(params => this.tag = params['tag'])}

  ngOnInit(): void {
    console.log('init')
    this.postService.getByTag(this.tag)
      .subscribe(posts => {
        this.posts = posts
        console.log(this.posts)
      })
  }

}
