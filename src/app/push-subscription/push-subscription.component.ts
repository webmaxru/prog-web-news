import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfigService } from './../config.service';
import { PushSubscriptionService } from './../push-subscription.service';

// Import SwPush here

@Component({
  selector: 'push-subscription',
  templateUrl: './push-subscription.component.html',
  styleUrls: ['./push-subscription.component.css']
})
export class PushSubscriptionComponent implements OnInit {
  private VAPID_PUBLIC_KEY: string;
  private snackBarDuration: number = 2000
  private swScope: string = './';

  constructor(private pushSubscriptionService: PushSubscriptionService, public snackBar: MatSnackBar, private configService: ConfigService) {
  }

  ngOnInit() {
    this.VAPID_PUBLIC_KEY = this.configService.get('VAPID_PUBLIC_KEY');
  }

  subscribeToPush() {

    let convertedVapidKey = this.pushSubscriptionService.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY);

    navigator['serviceWorker']
      .getRegistration(this.swScope)
      .then(registration => {

        registration.pushManager
          .subscribe({ userVisibleOnly: true, applicationServerKey: convertedVapidKey })
          .then(pushSubscription => {

            this.pushSubscriptionService.addSubscriber(pushSubscription)
              .subscribe(

                res => {
                  console.log('[App] Add subscriber request answer', res)

                  let snackBarRef = this.snackBar.open('Now you are subscribed', null, {
                    duration: this.snackBarDuration
                  });
                },
                err => {
                  console.error('[App] Add subscriber request failed', err)
                }

              )

          });

      })
      .catch(err => {
        console.error(err);
      })


  }

  unsubscribeFromPush() {

    navigator['serviceWorker']
      .getRegistration(this.swScope)
      .then(registration => {

        registration.pushManager
          .getSubscription()
          .then(pushSubscription => {

            this.pushSubscriptionService.deleteSubscriber(pushSubscription)
              .subscribe(

                res => {
                  console.log('[App] Delete subscriber request answer', res)

                  let snackBarRef = this.snackBar.open('Now you are unsubscribed', null, {
                    duration: this.snackBarDuration
                  });

                  // Unsubscribe current client (browser)

                  pushSubscription.unsubscribe()
                    .then(success => {
                      console.log('[App] Unsubscription successful', success)
                    })
                    .catch(err => {
                      console.log('[App] Unsubscription failed', err)
                    })

                },
                err => {
                  console.error('[App] Delete subscription request failed', err)
                }

              )
          })

      })
      .catch(err => {
        console.error(err);
      })

  }
}
