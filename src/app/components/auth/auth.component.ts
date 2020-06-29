import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { GithubGistService } from 'src/app/services/github-gist.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  patGeneratorUrl = environment.githubPatGenerateLink;
  token = '';

  hasError = false;
  needsLogin = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gistService: GithubGistService) { }

  ngOnInit(): void {
    if (this.gistService.isTokenValid) {
      this.router.navigate(['/home']).then();
      return;
    }
    const { hasError, needsLogin } = this.route.snapshot.queryParams;
    if (hasError) {
      this.hasError = true;
    }
    if (needsLogin) {
      this.needsLogin = true;
    }
    localStorage.removeItem(environment.auth.key);
    this.gistService.isTokenValid = false;
    this.gistService.setToken('');
  }

  submit(): void {
    this.gistService.setToken(this.token);
    this.router.navigate(['/verifying'], {
      queryParams: {
        input: 'token'
      }
    }).then();
  }

}
