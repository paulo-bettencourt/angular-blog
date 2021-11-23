import { Component, Input, OnInit, Output } from '@angular/core';
import { Post } from '../add-post/post';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-read-posts',
  templateUrl: './read-posts.component.html',
  styleUrls: ['./read-posts.component.scss']
})
export class ReadPostsComponent implements OnInit {

  arrayOfPosts: Post[] = []

  title: string = "Angular Blog"

  constructor(private api: BlogService) { }

  ngOnInit(): void {
    this.readPosts();
  }

  readPosts() {
    this.api.readPostsGetApiRequest()
      .subscribe(response => this.arrayOfPosts = response.reverse())

    console.log(this.arrayOfPosts)
  }

  counterOutput(event: any) {
    console.log(event.responseApiFromServer, "<< Output Event");
  }

}
