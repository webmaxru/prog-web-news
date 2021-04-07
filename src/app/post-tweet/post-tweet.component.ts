import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfigService } from '../config.service';
import { ApiService } from '../api.service';

import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  message;
  private snackBarDuration: number = 2000;
  subscription: Subscription;
  dataApiUrl;
  
  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    public snackBar: MatSnackBar
  ) {
    this.dataApiUrl = this.configService.get('DATA_API_URL');
  }


  ngOnInit() {
  }

  messageFormSubmit(messageForm: any) {

    if (messageForm.valid) {

      this.subscription = this.postTweet(messageForm.value.message).subscribe(
        res => {
          console.log('[App] Feedback was posted', res)
          let snackBarRef = this.snackBar.open('Feedback was sent', null, {
            duration: this.snackBarDuration
          });
        },
        err => {
          let snackBarRef = this.snackBar.open('Feedback will be sent after you go online', null, {
            duration: this.snackBarDuration
          });
        });

      messageForm.reset()

    }

  }

  postTweet(message: string): Observable<any> {
    console.log('[Feedback Service] Sending feedback');

    return this.apiService.callApi(`${this.dataApiUrl}/post-tweet`, 'POST', {
      message
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
