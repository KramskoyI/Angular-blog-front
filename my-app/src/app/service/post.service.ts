import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces';
import { map} from 'rxjs/operators'
const addPostUrl = 'http://localhost:3000/api/posts/add-post';


@Injectable({providedIn:'root'})

export class postService {
  constructor(private http: HttpClient) { }

  
  create(post: Post): Observable<Post> {
    return this.http.post<Post>(addPostUrl, post)
      .pipe(map((data) => {
        return data
      }))
  }

  
}