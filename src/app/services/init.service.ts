import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PreferenceService } from './preference.service';
import { PreferenceSyncService } from './preference-sync.service';


@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private auth: AngularFireAuth,
    private prefSync: PreferenceSyncService,
    private prefSvc: PreferenceService
  ) { }
  async init() {
    const user = await this.auth.user.pipe(first()).toPromise();
    if (user) {
      const userPref = await this.prefSync.get();
      this.prefSvc.init(environment.prefOptions, userPref, false);
    } else {
      this.prefSvc.init(environment.prefOptions);
    }
    return user;
  }
}
