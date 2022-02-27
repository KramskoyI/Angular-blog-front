import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userService } from 'src/app/service/user.service';
import {Router} from '@angular/router';
import { User } from '../models/user.models'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  constructor(private router: Router){}

  goLogIn(){
    this.router.navigate(['sign-in']);
  }

  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  onSubmit() {
    let user : User = Object.assign(this.signUpForm.value);
    
    userService.createUser(user).subscribe((response : User)=>{
      this.user.push(response);
    })
  }

}
