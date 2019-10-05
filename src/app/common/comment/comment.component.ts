import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wiki-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() docId: string;
  user: firebase.User | null = null;
  redirectUrl: string = location.pathname;
  authSubscription: Subscription | null = null;
  constructor(
    private commentSvc: CommentsService,
    private authSvc: AngularFireAuth
  ) { }

  ngOnInit() {
    this.authSubscription = this.authSvc.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
    this.authSubscription.unsubscribe();
    }
  }
}
