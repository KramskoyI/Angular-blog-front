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

  isLoginSubject = new BehaviorSubject<any>(0)

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

  isAutheticated(): boolean {
    return !!this.token
  }
  

  private setToken(response: any | null) {
    if (response) {
      this.isLoginSubject.next(response)
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('userId', response.id)
      return response
      
    } else {
      localStorage.clear()
    }
  }

  isLoggedIn() : Observable<any> {
    this.isLoginSubject.subscribe()
    return this.isLoginSubject.asObservable();
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