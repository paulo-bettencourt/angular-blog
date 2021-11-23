import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../add-post/post';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-read-posts',
  templateUrl: './read-posts.component.html',
  styleUrls: ['./read-posts.component.scss']
})
export class ReadPostsComponent implements OnInit, OnDestroy {

  arrayOfPosts$ = this.api.posts$
    .pipe(map((res) => res.reverse()));

  title: string = "Angular Blog"
  subs: Subscription = new Subscription();
  arrayOfPosts: Post[];

  constructor(private api: BlogService) { }

  ngOnInit(): void {
    this.readPosts();
    this.subs = this.api.posts$.subscribe(
      v => this.arrayOfPosts = v
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  readPosts() {
    this.api.readPostsGetApiRequest2();
    // .subscribe(response => this.arrayOfPosts = response.reverse())

    // console.log(this.arrayOfPosts)
  }

  counterOutput(event: any) {
    console.log(event.responseApiFromServer, "<< Output Event");
  }

}
