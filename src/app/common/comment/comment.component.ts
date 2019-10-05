import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentsService, IComment } from 'src/app/services/comments.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

interface ICommentWithUI extends IComment {
  showReply: boolean;
}

@Component({
  selector: 'wiki-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() docId: string;
  user: firebase.User | null = null;
  comment = '';
  comments: ICommentWithUI[] = [];
  redirectUrl: string = location.pathname;
  authSubscription: Subscription | null = null;
  constructor(
    private commentSvc: CommentsService,
    private authSvc: AngularFireAuth
  ) { }

  async ngOnInit() {
    this.authSubscription = this.authSvc.user.subscribe(user => {
      this.user = user;
    });
    this.commentSvc.getComment(this.docId).subscribe(comments => {
      const showingReply = new Set(this.comments.filter(u => u.showReply).map(u => u.id));
      this.comments = comments.map(u => ({...u, showReply: showingReply.has(u.id)}));
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
    this.authSubscription.unsubscribe();
    }
  }

  async saveResponse() {
    if (!this.comment) {
      return;
    }
    await this.commentSvc.addComment(this.docId, this.comment);
    this.comment = '';
  }
  async saveReply(contentElem: HTMLInputElement, parentId: string) {
    try {
      await this.commentSvc.addComment(this.docId, contentElem.value, parentId);
      contentElem.value = '';
    } catch (er) {

    }

  }
  async updateLike(commentId: string) {
    await this.commentSvc.updateLike(commentId);
  }
}
