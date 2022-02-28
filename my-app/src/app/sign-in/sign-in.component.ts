import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { userService } from '../service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent  {
  constructor(private router: Router, private userService: userService){}

  
  signInForm = new FormGroup({
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
    // TODO: Use EventEmitter with form value
    console.log(this.signInForm.value);
  }

  goHome(){
    const user: any = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }
    this.userService.logIn(user).subscribe(() => {
      this.signInForm.reset()
      this.router.navigate(['']);
    })
    console.log(user)
    
  }
}
