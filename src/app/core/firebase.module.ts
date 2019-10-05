import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from 'src/environments/environment';
import { NgxAuthFirebaseUIConfig } from 'ngx-auth-firebaseui/module/interfaces/config.interface';

const firebaseUIConfig: NgxAuthFirebaseUIConfig = {
  authGuardFallbackURL: '/login',
  authGuardLoggedInURL: '/',
  enableFirestoreSync: true,
  guardProtectedRoutesUntilEmailIsVerified: false,
  nameMaxLength: 50,
  nameMinLength: 2,
  passwordMaxLength: 20,
  passwordMinLength: 8,
  toastMessageOnAuthError: false,
  toastMessageOnAuthSuccess: false
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebaseConfig,
      undefined,
      firebaseUIConfig
      )
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxAuthFirebaseUIModule,
  ]
})
export class FirebaseModule { }
