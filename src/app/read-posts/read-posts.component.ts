import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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


}
