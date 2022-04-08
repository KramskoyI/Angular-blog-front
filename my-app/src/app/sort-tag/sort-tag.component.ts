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
  start: number = 0
  end: number = 3
  constructor(private route: ActivatedRoute, private postService: postService, private router: Router,) { route.params.subscribe(params => this.tag = params['tag'])}

  ngOnInit(): void {
    console.log('init')
    this.postService.getByTag(this.tag)
      .subscribe(posts => {
        this.posts = posts.slice(this.start, this.end)
        console.log(this.posts)
      })
  }

  next() {
    this.start = this.start + 3
    this.end = this.end + 3
    this.postService.getByTag(this.tag).subscribe(posts => {
      this.posts = posts.slice(this.start, this.end)
    })
    console.log(this.start, this.end)
  }
  down() {
    this.start = this.start - 3
    this.end = this.end - 3
    this.postService.getByTag(this.tag).subscribe(posts => {
      this.posts = posts.slice(this.start, this.end)
    })
    console.log(this.start, this.end)
  }
}
