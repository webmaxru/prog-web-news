import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(
    private titleService: Title,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      this.settingsService.buildAppTitle('About this website')
    );
  }
}
