import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BlogService } from '../blog.service';
import { Post } from './post';

@Component({
  selector: 'add-post',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  @Input() titleFromAnotherComponent: string;

  @Output() consoleLog = new EventEmitter();

  responseApi: any;

  profileForm = new FormGroup({
    title: new FormControl(''),
    post: new FormControl(''),
    image: new FormControl('')
  });

  constructor(private api: BlogService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const data = this.profileForm.value as Post;

    this.api.publishPost(data)
      .subscribe((response) => this.consoleLog.emit({ "responseApiFromServer": response }));
  }

  refresh(): void {
    // window.location.reload();
  }

}
