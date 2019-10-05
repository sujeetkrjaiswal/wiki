import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'wiki-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  providers = [AuthProvider.Google];
  private authSub: Subscription | null = null;
  constructor(
    private auth: AngularFireAuth,
    private route: Router
  ) { }

  ngOnInit() {
    this.authSub = this.auth.authState.pipe(
      filter(user => !!user)
    ).subscribe(user => {
      console.log('logi user', user);
      this.route.navigateByUrl('/');
    });
  }
  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
