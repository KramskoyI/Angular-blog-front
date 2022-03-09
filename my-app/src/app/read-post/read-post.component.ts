import { Component, OnInit } from '@angular/core';
import { postService } from '../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable, switchMap, Subscription } from 'rxjs';
import { Post } from '../interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.scss']
})
export class ReadPostComponent implements OnInit {

  id: any
  post: any = {}
  Form: any
  showPost: boolean = true
  closePost: boolean = false
  showModal: boolean = false
  closeModal: boolean = true

  constructor(private route: ActivatedRoute, private postService: postService, private router: Router){
     route.params.subscribe(params => this.id = params['id'])
  }
  
  ngOnInit() {
    this.postService.getById(this.id)
      .subscribe(post => {
        this.post = post
        this.Form = new FormGroup({
          title: new FormControl( this.post.title, [
            Validators.required,
            Validators.minLength(2)
          ]),
          content: new FormControl(this.post.content, [
            Validators.required,
            Validators.minLength(2)
          ]),
          filedata: new FormControl('')
        })
      
      })
    
  }
  

  delete() {
    this.postService.deleteById(this.id).subscribe()
    this.router.navigate([''])
  }
  
  edit() {
    this.showPost = !this.showPost
    this.closePost = !this.closePost
    this.showModal = !this.showModal
    this.closeModal = !this.closeModal
  }
  editPost(){
    const post: Post = {
      title: this.Form.value.title,
      content: this.Form.value.content,
      image: this.Form.value.filedata,
      
    }
    this.postService.putById(this.id, post).subscribe(() => {
      this.Form.reset()
    })
    console.log(post)
    this.router.navigate([''])
  }
  
}
