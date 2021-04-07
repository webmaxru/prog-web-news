import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SettingsService } from '../settings.service';
import { Workbox, messageSW } from 'workbox-window';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  title: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {
    this.title = settingsService.appTitle;

    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');

      const showSkipWaitingPrompt = (event) => {
        let snackBarRef = this.snackBar.open(
          'A new version of the website available',
          'Reload page',
          {
            duration: 5000,
          }
        );

        // Displaying prompt

        snackBarRef.onAction().subscribe(() => {
          // Assuming the user accepted the update, set up a listener
          // that will reload the page as soon as the previously waiting
          // service worker has taken control.
          wb.addEventListener('controlling', () => {
            window.location.reload();
          });

          // This will postMessage() to the waiting service worker.
          wb.messageSkipWaiting();
        });
      };

      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      wb.addEventListener('waiting', showSkipWaitingPrompt);

      wb.register()
        .then((reg) => {
          console.log('Successful service worker registration', reg);
        })
        .catch((err) =>
          console.error('Service worker registration failed', err)
        );

    } else {
      console.error('Service Worker API is not supported in current browser');
    }
  }
}