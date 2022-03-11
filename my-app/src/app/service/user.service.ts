import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, UserLog } from '../interfaces';
import { map, tap } from 'rxjs/operators'
const signUpUrl = 'http://localhost:3000/api/auth/sign-up';
const signInUrl = 'http://localhost:3000/api/auth/sign-in';


@Injectable({providedIn:'root'})

export class userService {
  constructor(private http: HttpClient) { }

  get token(): any {
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
    if (response) {
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('userId', response.id)
      console.log('response', response)
      return response
      
    } else {
      localStorage.clear()
    }
  }

  getST() {
    return localStorage.getItem('id')
  }

  setNewToken(response: any | null) {
    if (response) {
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', response.accessToken)
    } else {
      localStorage.clear()
    }
    
  }
}