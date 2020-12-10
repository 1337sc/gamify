import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../user';
import { Comment } from '../comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  author: User;
  loaded = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getUser(this.comment.authorId)
      .subscribe((response) => (this.author = response.body));
    this.loaded = true;
  }
}
