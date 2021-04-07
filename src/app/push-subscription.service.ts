import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PushSubscriptionService {
  private pushSubscriptionUrl: string;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) {
    this.pushSubscriptionUrl = `${this.configService.get(
      'PUSH_API_URL'
    )}/webpush`;
  }

  addSubscriber(subscription): Observable<any> {
    console.log('[Push Subscription Service] Adding subscriber');

    let body = {
      action: 'subscribe',
      subscription: subscription
    };

    return this.apiService.callApi(this.pushSubscriptionUrl, 'POST', body);
  }

  deleteSubscriber(subscription): Observable<any> {
    console.log('[Push Subscription Service] Deleting subscriber');

    let body = {
      action: 'unsubscribe',
      subscription: subscription
    };

    return this.apiService.callApi(this.pushSubscriptionUrl, 'POST', body);
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
