import { ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { postService } from '../service/post.service';
import {Router} from '@angular/router';
import { Post } from '../interfaces';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  addPostForm: any
  selectedFile: any
  formGroup = this.fb.group({
    file: [null]
  });
  nameFile: any
  constructor(private router: Router, private postService: postService, private http: HttpClient, private fb: FormBuilder, private cd: ChangeDetectorRef){}

  onFileChange(event: any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      console.log('image')
      const [file] = event.target.files
      this.nameFile = file.name
      reader.readAsDataURL(file)
      console.log('this is const [file]', [file])
      reader.onload = () => {
        this.formGroup.patchValue({ file: reader.result })
        this.selectedFile = this.formGroup.value
        this.cd.markForCheck()
      };
    } 
  }

  

  ngOnInit() {
    this.addPostForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
  
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
  
      tag: new FormControl('')
    });
  }
  onSubmit() {}

  addPost(){
    if(this.selectedFile) {
      const test = this.selectedFile.file
      const test2 = test.slice(23, test.length-1)
      const post: Post = {
        title: this.addPostForm.value.title,
        content: this.addPostForm.value.content,
        image: test,
        nameImage: this.nameFile ,
        tag: this.addPostForm.value.tag
      }
      this.postService.create(post).subscribe((res) => {
        console.log('res: ', res)
        this.addPostForm.reset()
      })
    } else {
      const post: Post = {
        title: this.addPostForm.value.title,
        content: this.addPostForm.value.content,
        image: null,
        nameImage: null,
        tag: this.addPostForm.value.tag
      }
      this.postService.create(post).subscribe((res) => {
        console.log('res: ', res)
        this.addPostForm.reset()
      })
    }
    this.router.navigate([''])
  }
}
