import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {

  addPostForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    image: new FormControl('')
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.addPostForm.value);
  }

}
