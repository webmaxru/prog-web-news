import { Component, OnInit } from '@angular/core';
import { GhostService } from '../ghost.service';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts;

  constructor(
    private ghostService: GhostService,
    private titleService: Title,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.settingsService.buildAppTitle('All posts'));

    this.ghostService.ghostConnection.posts
      .browse({
        fields: 'slug,title,excerpt, custom_excerpt,published_at',
        include: 'authors, tags',
      })
      .then((posts) => {
        this.posts = posts;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
