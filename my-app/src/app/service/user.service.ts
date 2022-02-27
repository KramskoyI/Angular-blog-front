import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.models'

const signUpUrl = 'http://localhost:3000/api/auth/sign-up';

@Injectable()

export class userService {

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(signUpUrl, user).pipe(
      map((data) => {
        return data;
      })
    )
  }

}