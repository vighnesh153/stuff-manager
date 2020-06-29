import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { GithubGistService } from 'src/app/services/github-gist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private gistService: GithubGistService) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.router.navigate(['/auth']).then();
  }

}
