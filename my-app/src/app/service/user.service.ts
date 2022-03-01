import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserLog, authResponse} from '../interfaces';
import { map, tap } from 'rxjs/operators'
const signUpUrl = 'http://localhost:3000/api/auth/sign-up';
const signInUrl = 'http://localhost:3000/api/auth/sign-in';

@Injectable({providedIn:'root'})

export class userService {
  constructor(private http: HttpClient) { }

  get token(): any {
    const accessToken = localStorage.getItem('accessToken')
    return localStorage.getItem('accessToken')
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(signUpUrl, user)
      .pipe(map((data) => {
        return data
      }))
  }

  logIn(user: UserLog): Observable<UserLog> {
    user.returnSecureToken = true
    return this.http.post<UserLog>(signInUrl, user)
    .pipe(
      tap(this.setToken)
    )
  }

  logOut(){ 
    this.setToken(null)
  }

  isAutheticated(): boolean {
    return !!this.token
  }

  private setToken(response: any | null) {
    if ( response) {
      const dateToken = response.expiresIn
      localStorage.setItem('dateToken', dateToken.toString())
      localStorage.setItem('accessToken', response.accessToken)
    } else {
      localStorage.clear()
    }
    
  }
}