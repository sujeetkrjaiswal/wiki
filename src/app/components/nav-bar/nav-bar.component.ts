import { Component, OnInit } from '@angular/core';
import { PreferenceService } from 'src/app/services/preference.service';
import { ITheme, IFont, IActivePreference } from 'src/app/services/preference.model';
import { PreferenceSyncService } from 'src/app/services/preference-sync.service';
import { AngularFireAuth, } from '@angular/fire/auth';

@Component({
  selector: 'wiki-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  activePref: IActivePreference;
  themes: ITheme[] = [];
  fonts: IFont[] = [];
  user: Partial<firebase.User> | null = null;
  constructor(
    private prefSvc: PreferenceService,
    private prefSync: PreferenceSyncService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.themes = this.prefSvc.options.themes || [];
    this.fonts = this.prefSvc.options.fonts || [];
    this.prefSync.prefChanged.subscribe(pref => {
      this.activePref = pref;
      console.log(this.activePref);
    });
    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  updateTheme(theme: ITheme) {
    this.prefSvc.updatePref({ theme });
  }
  updateFont(font: IFont) {
    this.prefSvc.updatePref({ font });
  }
  toggleDarkMode() {
    const isDarkMode = !this.activePref.isDarkMode;
    this.prefSvc.updatePref({ isDarkMode });
  }
  toggleContentDir() {
    const direction = this.activePref.direction === 'ltr' ? 'rtl' : 'ltr';
    this.prefSvc.updatePref({ direction });
  }

  async logout() {
    await this.auth.auth.signOut();
  }
}
