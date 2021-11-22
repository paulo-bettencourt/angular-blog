import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BlogService } from '../blog.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  @Input() titleFromAnotherComponent: string

  @Output() counter = new EventEmitter();

  profileForm = new FormGroup({
    title: new FormControl(''),
    post: new FormControl(''),
    image: new FormControl('')
  });;

  constructor(private api: BlogService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.api.publishPost(this.profileForm).subscribe((response) => console.log(response))
  }

  refresh(): void {
    window.location.reload();
  }

}
