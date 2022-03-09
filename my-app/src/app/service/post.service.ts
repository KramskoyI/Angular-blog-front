import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces';
import { map} from 'rxjs/operators'
const addPostUrl = 'http://localhost:3000/api/posts/add-post';
const getPostsUrl = 'http://localhost:3000/api/posts/';


@Injectable({providedIn:'root'})

export class postService {
  constructor(private http: HttpClient) { }


  create(post: Post): Observable<Post> {
    return this.http.post<Post>(addPostUrl, post)
      .pipe(map((data) => {
        return data
      }))
  }

  getAll(): Observable<any>{
    return this.http.get(getPostsUrl)
  }

  getById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/posts/${id}`)
  }
  
  deleteById(id: string) {
    return this.http.delete(`http://localhost:3000/api/posts/${id}`)
  }

  putById(id: string, post: Post): Observable<Post>  {
    return this.http.put<Post>(`http://localhost:3000/api/posts/${id}`, post)
  }
  
}