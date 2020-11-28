import { Injectable } from '@angular/core';
import GhostContentAPI from '@tryghost/content-api'

@Injectable({
  providedIn: 'root'
})
export class GhostService {

  ghostConnection;

  constructor() { 

    this.ghostConnection = new GhostContentAPI({
      url: 'https://progwebnews-app.azurewebsites.net',
      key: '7bcf4d0fbd1d518e7da4c74465',
      version: "v3"
    });

  }
}
