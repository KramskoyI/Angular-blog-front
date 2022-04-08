import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, UserLog } from '../interfaces';
import { map, tap } from 'rxjs/operators';
import {Router} from '@angular/router';

const signUpUrl = 'http://localhost:3000/api/auth/sign-up';
const signInUrl = 'http://localhost:3000/api/auth/sign-in';


@Injectable({providedIn:'root'})

export class userService {
  id: any = localStorage.getItem('userId')
  user: any
  constructor(private http: HttpClient, private router: Router) { }

  isLoginSubject = new BehaviorSubject<any>(this.isAutheticated())

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
      tap(this.setToken.bind(this))
    )
  }

  logOut(){ 
    this.isLoginSubject.next(0)
    this.setToken(null)
  }

  isAutheticated(): any {
    if(this.token) {
      console.log('find user')
      return this.http.get('http://localhost:3000/api/auth/')
    } else {
      return 0
    }
  }

  isAutheticated2(): boolean {
    return !!this.token
  }

  private setToken(response: any | null) {
    if (response) {
      this.isLoginSubject.next(response)
      localStorage.setItem('accessToken', response.accessToken)
      
    } else {
      localStorage.clear()
    }
  }

  isLoggedIn() : Observable<any> {
    this.isLoginSubject.subscribe()
    return this.isLoginSubject.asObservable();
  }

  setNewToken() {
    return this.http.get('http://localhost:3000/api/auth/refresh-token')
  }

  setToken2(response: any | null) {
    if (response) {
      console.log('this is new tokken',response)
      localStorage.setItem('accessToken', response.accessToken)
      
    } else {
      localStorage.clear()
    }
  }

  getGoogle() {
    return this.http.get('http://localhost:3000/api/auth/google')
  }
}