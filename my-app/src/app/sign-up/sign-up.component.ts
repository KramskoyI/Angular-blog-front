import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userService } from '../service/user.service';
import {Router} from '@angular/router';
import { User } from '../interfaces'



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  constructor(private router: Router, private userService: userService){}

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

  onSubmit() {  }
  
  goLogIn(){
    const user: User = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }
    this.userService.create(user).subscribe(() => {
      this.signUpForm.reset()
    })
    console.log(user)

    this.router.navigate(['sign-in'])
  }
}
