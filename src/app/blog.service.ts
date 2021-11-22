import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  urlPosts = 'http://localhost:3000/posts/'

  constructor(private http: HttpClient) { }

  publishPost(formGroup: FormGroup): Observable<Post> {

    console.warn(formGroup.value.title, formGroup.value.post, formGroup.value.image)

    return this.http.post<Post>(this.urlPosts, {
      "title": formGroup.value.title,
      "post": formGroup.value.post,
      "image": formGroup.value.image
    })
      .pipe(
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

}


