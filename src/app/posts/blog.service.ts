import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Post } from './add-post/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  urlPosts = 'http://localhost:3000/posts/';
  posts$ = new Subject<Post[]>();
  req = 0;

  constructor(private http: HttpClient) { }

  // publishPost(formGroup: FormGroup): Observable<Post> {
  publishPost(data: Post): Observable<Post> {

    // console.warn(formGroup.value.title, formGroup.value.post, formGroup.value.image)
    // const data = formGroup.value;

    return this.http.post<Post>(this.urlPosts, data)
      .pipe(
        tap(() => this.readPostsGetApiRequest2()),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  readPostsGetApiRequest(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlPosts)
      .pipe(
        catchError(this.handleError)
      );
  }

  readPostsGetApiRequest2(): void {
    this.http.get<Post[]>(this.urlPosts)
      .subscribe(
        res => {
          this.posts$.next(res);
        },
        err => this.handleError(err)
      );
  }

}


