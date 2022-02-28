import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { map } from 'rxjs/operators'
const signUpUrl = 'http://localhost:3000/api/auth/sign-up';

@Injectable({providedIn:'root'})

export class userService {
  constructor(private http: HttpClient) { }

  get token(): string {
    return ''
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(signUpUrl, user)
      .pipe(map((data) => {
        return data
      }));
  };
  
  logIn(user: any): Observable<any> {
    return this.http.post<any>(signUpUrl, user);
  };

  logOut(){ 

  }

  isAutheticated(): boolean {
    return !!this.token
  }

  private setToken() {
    
  }
}