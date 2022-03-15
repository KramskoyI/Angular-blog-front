import { Component, OnInit } from '@angular/core';
import { postService } from '../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable, switchMap, Subscription } from 'rxjs';
import { Post, Like } from '../interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userService } from '../service/user.service';
@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.scss']
})
export class ReadPostComponent implements OnInit {
  user: any
  isLoggedIn: Observable<any>
  id: any
  autorId: any
  userId: any
  userLikeId: any
  post: any = {}
  Form: any
  showPost: boolean = true
  closePost: boolean = false
  showModal: boolean = false
  closeModal: boolean = true
  proverka: boolean = false
  show:boolean = true
  none:boolean = false
  showL:boolean = false
  noneL:boolean = true

  constructor(private route: ActivatedRoute, private postService: postService, private router: Router, private userService: userService){
    route.params.subscribe(params => this.id = params['id'])
    this.isLoggedIn = userService.isLoggedIn()
  }
  
  ngOnInit() {
    this.userService.isLoginSubject.subscribe((user)=> {
      this.user = user
      this.userId = user.id
      
    })
    this.postService.getById(this.id)
      .subscribe(post => {
        this.post = post
        this.autorId = this.post.autorId
        this.userLikeId = post.Like.userNum
        if(this.autorId == this.user.id){
          this.show= true
          this.none= false
          this.showL = false
          this.noneL= true
        } else {
          this.show= false
          this.none= true
          this.showL = true
          this.noneL= false
        }
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
    if (this.user.id == this.post.autorId){
      this.postService.deleteById(this.id).subscribe()
      this.router.navigate([''])
    } else {
      this.proverka = true
    }
   
  }
  
  edit() {
    if (this.user.id == this.post.autorId){
      this.showPost = !this.showPost
      this.closePost = !this.closePost
      this.showModal = !this.showModal
      this.closeModal = !this.closeModal
    } else {
      this.proverka = true
    }
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
  like() {
    this.show = !this.show
    this.none = !this.none
    this.showL = !this.showL
    this.noneL = !this.noneL
    const like: Like = {
      postNum: this.post.id,
      userNum: this.user.id
    }
    
    this.postService.likeById(like).subscribe(() => {
      console.log(like)
    })
  }
}
