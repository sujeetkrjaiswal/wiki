import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { InitService } from './services/init.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgMaterialModule } from './common/ng-material.module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    NgMaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
