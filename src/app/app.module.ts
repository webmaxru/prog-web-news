import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppShellComponent } from './app-shell/app-shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './shared/post-list/post-list.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { AboutComponent } from './about/about.component';

import { CachedRouteComponent } from './cached-route/cached-route.component';
import { NonCachedRouteComponent } from './non-cached-route/non-cached-route.component';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { PushSubscriptionComponent } from './push-subscription/push-subscription.component';


@NgModule({
  declarations: [
    AppShellComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    PostListComponent,
    PostCardComponent,
    AboutComponent,
    CachedRouteComponent,
    NonCachedRouteComponent,
    PostTweetComponent,
    PushSubscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppShellComponent],
})
export class AppModule {}
