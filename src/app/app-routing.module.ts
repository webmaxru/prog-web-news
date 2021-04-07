import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AboutComponent } from './about/about.component';
import { NonCachedRouteComponent } from './non-cached-route/non-cached-route.component';
import { CachedRouteComponent } from './cached-route/cached-route.component';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { PushSubscriptionComponent } from './push-subscription/push-subscription.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:slug', component: PostComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'cached-route',
    component: CachedRouteComponent,
  },
  {
    path: 'non-cached-route',
    component: NonCachedRouteComponent,
  },
  {
    path: 'feedback',
    component: PostTweetComponent,
  },
  {
    path: 'subscription',
    component: PushSubscriptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
