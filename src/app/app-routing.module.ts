import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Login
import { LoginModule } from './routing/login/login.module';
import { LoginComponent } from './routing/login/login.component';
import { LoginGuard } from './routing/login/login.guard';
// Home
import { HomeModule } from './routing/home/home.module';
import { HomeComponent } from './routing/home/home.component';
// Content
import { ContentModule } from './routing/content/content.module';
import { ContentComponent } from './routing/content/content.component';
// About
import { AboutModule } from './routing/about/about.module';
import { AboutComponent } from './routing/about/about.component';
import { ProfileModule } from './routing/profile/profile.module';
import { ProfileComponent } from './routing/profile/profile.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: LoginComponent,
  canActivate: [LoginGuard],
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'content/:contentId',
  component: ContentComponent
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [LoggedInGuard]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginModule,
    HomeModule,
    ContentModule,
    AboutModule,
    ProfileModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
