import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../comment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss'],
})
export class CommentAddComponent implements OnInit {
  currentText: string;
  currentPlaceId: number;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.currentPlaceId = Number.parseInt(
      this.activeRoute.snapshot.params['id']
    );
  }

  ngOnInit(): void {}

  save(): void {
    this.dataService
      .createComment(
        new Comment(
          0,
          Number.parseInt(localStorage.getItem('curUser')),
          this.currentText,
          0
        )
      )
      .subscribe((response) => {
        this.dataService
          .createCommentForPlace(response.body.id, this.currentPlaceId)
          .subscribe(() =>
            this.router.navigateByUrl('/placeAbout/' + this.currentPlaceId)
          );
      });
  }
}
