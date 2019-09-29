import { Injectable } from '@angular/core';
import { PreferenceSyncService } from './preference-sync.service';
import { IActivePreference, IPreferenceOptions, ITheme, IFont } from './preference.model';


@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  private activePref: IActivePreference;
  private prefOptions: IPreferenceOptions;
  private elem = document.body;
  constructor(
    private sync: PreferenceSyncService
  ) {
    this.sync.prefChanged.subscribe(pref => {
      this.updatePref(pref, false);
    });
  }

  get pref(): IActivePreference {
    return this.activePref;
  }
  get options(): IPreferenceOptions {
    return this.prefOptions;
  }
  init(prefOptions: IPreferenceOptions, activePref?: IActivePreference) {
    console.log('Preference Initialized');
    this.prefOptions = prefOptions;
    this.updatePref(activePref, true);
    // this.activePref = activePref;
  }
  updatePref(partialPref: Partial<IActivePreference> = this.defaultActivePref, sync = true) {
    if (!this.prefOptions) { return; }
    let hasUpdates = false;
    if (partialPref.theme && partialPref.theme.themeClass &&
      this.prefOptions.themes.some(theme => partialPref.theme && theme.themeClass === partialPref.theme.themeClass) &&
      (!this.activePref || (this.activePref && this.activePref.theme.themeClass !== partialPref.theme.themeClass))) {
      this.updateTheme(partialPref.theme);
      hasUpdates = true;
    }
    if (partialPref.font && partialPref.font.fontClass &&
      this.prefOptions.fonts.some(font => partialPref.font && font.fontClass === partialPref.font.fontClass) &&
      (!this.activePref || (this.activePref && this.activePref.font.fontClass !== partialPref.font.fontClass))) {
      this.updateFont(partialPref.font);
      hasUpdates = true;
    }
    if (partialPref.isDarkMode !== undefined && (!this.activePref ||
      (this.activePref && this.activePref.isDarkMode !== partialPref.isDarkMode))) {
      this.updateDarkMode(partialPref.isDarkMode);
      hasUpdates = true;
    }
    if (!this.activePref || (this.activePref && this.activePref.direction !== partialPref.direction)) {
      this.updateDir(partialPref.direction);
      hasUpdates = true;
    }
    if (hasUpdates) {
      this.activePref = {
        ...(this.activePref || this.defaultActivePref),
        ...partialPref
      };
      if (sync) {
        this.sync.set(this.activePref);
      }
    }

  }

  private updateTheme(theme: ITheme) {
    this.elem.classList.remove(...this.prefOptions.themes.map(u => u.themeClass));
    this.elem.classList.add(theme.themeClass);
  }
  private updateFont(font: IFont) {
    this.elem.classList.remove(...this.prefOptions.fonts.map(u => u.fontClass));
    this.elem.classList.add(font.fontClass);
  }
  private updateDarkMode(isDarkMode) {
    this.elem.classList.remove(this.prefOptions.darkMode.active, this.prefOptions.darkMode.inactive);
    this.elem.classList.add(isDarkMode ? this.prefOptions.darkMode.active : this.prefOptions.darkMode.inactive);
  }
  private updateDir(dir) {
    this.elem.setAttribute('dir', dir);
  }

  private get defaultActivePref(): IActivePreference {
    return {
      theme: this.prefOptions.themes.find(theme => theme.isDefault) || this.prefOptions.themes[0],
      font: this.prefOptions.fonts.find(font => font.isDefault) || this.prefOptions.fonts[0],
      direction: this.prefOptions.direction || 'ltr',
      isDarkMode: this.prefOptions.darkMode && this.prefOptions.darkMode.default || false
    };
  }

}
