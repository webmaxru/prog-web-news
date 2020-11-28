import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  appTitle = 'Progressive Web News';

  buildAppTitle(customPart: string) {
    return customPart + ' | ' + this.appTitle;
  }
}
