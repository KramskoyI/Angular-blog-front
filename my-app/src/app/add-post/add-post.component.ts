import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { postService } from '../service/post.service';
import {Router} from '@angular/router';
import { Post } from '../interfaces'
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  constructor(private router: Router, private postService: postService){}

  addPostForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    filedata: new FormControl(),
    tag: new FormControl('')
  });

  ngOnInit() {
    
  }

  onSubmit() {
    
    
  }

  addPost(){
    const post: Post = {
      title: this.addPostForm.value.title,
      content: this.addPostForm.value.content,
      image: this.addPostForm.value.filedata,
      tag: this.addPostForm.value.tag
    }
    this.postService.create(post).subscribe(() => {
      this.addPostForm.reset()
    })
    console.log(post)
    this.router.navigate([''])
  }
}
