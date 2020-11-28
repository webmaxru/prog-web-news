import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GhostService } from '../ghost.service';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postSlug: string;
  post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ghostService: GhostService,
    private titleService: Title,
    private settingsService: SettingsService
  ) {
    this.postSlug = '';
  }

  ngOnInit(): void {
    this.postSlug = this.route.snapshot.paramMap.get('slug');

    this.ghostService.ghostConnection.posts
      .read({ slug: this.postSlug, include: 'authors, tags' })
      .then((post) => {
        this.post = post;
        this.titleService.setTitle(
          this.settingsService.buildAppTitle(post.title)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
