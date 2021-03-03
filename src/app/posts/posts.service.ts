import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Post } from './post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = environment.apiUrl;
  private posts: Post[];

  constructor(private http: HttpClient) { }

  getPosts(perPage: number, pageNum: number): Observable<{ posts: Post[], postCount: number }> {
    return this.http.get<{ message: string, posts: Post[], postsCount: number }>(
      this.baseUrl + 'posts?pagesize=' + perPage + '&page=' + pageNum
    ).pipe(map(responseData => {
      return {
        posts: responseData.posts,
        postCount: responseData.postsCount
      }
    }));
  }

  getPost(id: string): Observable<{ message: string, post: Post }> {
    return this.http.get<{ message: string, post: Post }>(this.baseUrl + 'posts/' + id);
  }
}
