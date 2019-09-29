import { Injectable } from '@angular/core';
import { IActivePreference } from './preference.model';
import { ReplaySubject, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PreferenceSyncService {
  private prefUpdated = new ReplaySubject<IActivePreference>(1);

  constructor(
    private store: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    // Wait for login to complete and then update the pref
    this.auth.authState.pipe(switchMap(user => {
      if (user) {
        return this.store.collection('preferences').doc(user.uid).valueChanges();
      }
      return of(null);
    }))
      // .pipe(filter(u => !!u))
      .subscribe((pref: IActivePreference) => {
        if (pref) {
          this.prefUpdated.next(pref);
        }
      });
  }
  async get(): Promise<IActivePreference | null> {
    const user = await this.auth.user.pipe(first()).toPromise();
    if (!user) {
      return null;
    }
    const doc = await this.getUserPreferenceRef(user.uid).get().toPromise();
    if (doc.exists) {
      return doc.data() as IActivePreference;
    }
    return null;
  }
  async set(pref: IActivePreference) {
    const user = await this.auth.authState.pipe(first()).toPromise();
    if (user) {
      const res = await this.store.collection('preferences').doc(user.uid).set(pref);
      console.log('Save PRef', res);
    } else {
      // Try to save it to localStorage
      this.prefUpdated.next(pref);
    }

  }
  get prefChanged() {
    return this.prefUpdated.asObservable();
  }

  private getUserPreferenceRef(userId: string) {
    return this.store.collection('preferences').doc<IActivePreference>(userId);
  }
}
