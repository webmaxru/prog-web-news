import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postSlug: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.postSlug = '';
  }

  ngOnInit(): void {
    this.postSlug = this.route.snapshot.paramMap.get('slug')!;
  }
}
