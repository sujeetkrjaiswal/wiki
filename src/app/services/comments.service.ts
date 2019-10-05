import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private store: AngularFirestore,
  ) { }
}
