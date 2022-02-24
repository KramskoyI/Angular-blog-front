import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const signUpUrl = 'http://localhost:3000/api/auth/sign-up';

@Injectable()
export class userService {
  constructor(private HttpClient: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.HttpClient.post(signUpUrl, user);
  }

}