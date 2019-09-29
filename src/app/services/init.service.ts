import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PreferenceService } from './preference.service';


@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private auth: AngularFireAuth,
    private prefSvc: PreferenceService
  ) { }
  async init() {
    const authState = await this.auth.authState.pipe(first()).toPromise();
    const user = await this.auth.user.pipe(first()).toPromise();
    console.log('user init', user);
    this.prefSvc.init(environment.prefOptions);
    return user;
  }
}
