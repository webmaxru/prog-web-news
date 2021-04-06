import { Injectable } from '@angular/core';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config: any = environment.config;

  constructor() {}

  get(key: any) {
    return this._config[key];
  }
}
