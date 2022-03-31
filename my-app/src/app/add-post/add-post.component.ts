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
  selectedFile: any
  addPostForm: any
  formGroup = this.fb.group({
    file: [null]
  });
  nameFile: any
  constructor(private router: Router, private postService: postService, private http: HttpClient, private fb: FormBuilder, private cd: ChangeDetectorRef){}

  // onFileSelected(event: any) {
  //   this.selectedFile = <File>event.target.files[0]
  //   console.log('this.selectedFile', this.selectedFile, event)
  // }
  onFileChange(event: any) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.nameFile = file.name
      console.log('name', name)
      reader.readAsDataURL(file);
      console.log('this is const [file]', [file])
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
       });
       console.log('this.formGroup', this.formGroup.value)
       this.selectedFile = this.formGroup.value
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        
      };
      console.log('reader.onload', reader.onload)
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
  
      // filedata: new FormControl(),
      // filedata: new FormData(),
  
      tag: new FormControl('')
    });
  }
  onSubmit() {}

  addPost(){
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
    
    // this.router.navigate([''])
  }
}
