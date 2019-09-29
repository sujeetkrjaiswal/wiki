import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { InitService } from './services/init.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgMaterialModule } from './common/ng-material.module';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    NgMaterialModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (initSvc: InitService) => () => initSvc.init(),
    deps: [InitService],
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
