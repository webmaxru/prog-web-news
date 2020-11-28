import { Component, OnInit } from '@angular/core';
import { GhostService } from '../ghost.service';
import { Title } from '@angular/platform-browser';
import { AppShellComponent } from '../app-shell/app-shell.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GhostService],
})
export class HomeComponent implements OnInit {
  latestPosts;
  featuredPost;

  constructor(private ghostService: GhostService, private titleService: Title, private appShellComponent: AppShellComponent) {}

  ngOnInit(): void {
    this.ghostService.ghostConnection.posts
      .browse({
        limit: 1,
        fields: 'slug,title,custom_excerpt,published_at,feature_image',
        include: 'authors, tags',
      })
      .then((posts) => {
        this.featuredPost = posts[0];
        this.titleService.setTitle(this.appShellComponent.buildTitle(posts[0].title));
      })
      .catch((err: any) => {
        console.error(err);
      });

    this.ghostService.ghostConnection.posts
      .browse({
        limit: 4,
        fields: 'slug,title,published_at',
        include: 'authors, tags',
      })
      .then((posts) => {
        this.latestPosts = [...posts.slice(1)];
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
