import { Injectable } from '@angular/core';
import { IActivePreference, IPreferenceOptions } from './preference.model';
import { Subject, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreferenceSyncService {
  private prefUpdated = new ReplaySubject<IActivePreference>(1);

  constructor() { }
  get(): IActivePreference | null {
    return null;
  }
  set(pref: IActivePreference): void {
    this.prefUpdated.next(pref);
  }
  get prefChanged() {
    return this.prefUpdated.asObservable();
  }
}
