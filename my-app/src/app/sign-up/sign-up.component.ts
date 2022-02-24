import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { userService } from 'src/service/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.signUpForm.value);
    
    
  }

}
