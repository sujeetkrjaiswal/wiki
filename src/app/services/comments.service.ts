import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {firestore} from 'firebase/app';

type Timestamp = firebase.firestore.Timestamp;
export interface IComment {
  id: string;
  comment: string;
  commentedOn: Date;
  commentorId: string;
  commentorName: string;
  commentorPhoto: string;
  entryAssociatedWith: string;
  lastUpdatedOn: Date;
  parentComment: string;
  likes: number;
  replies?: Omit<IComment, 'replies' | 'parentComment'>[];
}

export interface ICommentAtStore {
  comment: string;
  commentedOn: firebase.firestore.Timestamp;
  commentorId: string;
  commentorName: string;
  commentorPhoto: string;
  entryAssociatedWith: string;
  likes: number;
  lastUpdatedOn: firebase.firestore.Timestamp ;
  parentComment: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentCollection = this.store.collection<ICommentAtStore>('comments');
  constructor(
    private store: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

   getComment(docId: string): Observable<any> {
     return this.store.collection<ICommentAtStore>('comments',
     ref => ref.where('entryAssociatedWith', '==', docId.toLowerCase()).orderBy('commentedOn', 'desc')
     ).snapshotChanges()
     .pipe(
        map(docs => docs.map((docChangeAction): IComment => {
          const doc = docChangeAction.payload.doc.data();
          return {
            ...doc,
            id: docChangeAction.payload.doc.id,
            commentedOn: (doc.commentedOn as Timestamp).toDate(),
            lastUpdatedOn: (doc.lastUpdatedOn as Timestamp).toDate()
          };
        })),
        tap(console.log),
        map((flatComments: IComment[]): IComment[] => {
          const parentCommentReplyMap = new Map<string, IComment[]>();
          const parentComments = flatComments.filter(comment => {
            if (!comment.parentComment) {
              return true;
            }
            const parentCommentReplies = parentCommentReplyMap.get(comment.parentComment) || [];
            parentCommentReplies.push(comment);
            parentCommentReplyMap.set(comment.parentComment, parentCommentReplies);
            return false;
          });
          return parentComments.map(comment => ({
            ...comment,
            replies: parentCommentReplyMap.get(comment.id) || []
          }));

        })
     );
  }

  async addComment(docId: string, comment: string, parentId?: string) {
    const user = await this.auth.user.pipe(first()).toPromise();
    if (!user) {
      return Promise.reject('User Not Logged In');
    }
    const timeStamp: firestore.Timestamp = firestore.Timestamp.now();
    const req: ICommentAtStore = {
      comment,
      commentedOn: timeStamp,
      commentorId: user.uid,
      commentorName: user.isAnonymous ? 'Anonymous User' : user.displayName,
      commentorPhoto: user.photoURL || '',
      entryAssociatedWith: docId.toLowerCase(),
      likes: 0,
      lastUpdatedOn: timeStamp,
      parentComment: parentId || ''
    };
    return this.commentCollection.add(req);
  }

  async updateLike(commentId: string) {
    this.commentCollection.doc(commentId)
    .update({likes: firestore.FieldValue.increment(1)});
  }
}
