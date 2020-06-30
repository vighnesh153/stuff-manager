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
  loading = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gistService: GithubGistService) { }

  ngOnInit(): void {
    if (this.gistService.isTokenValid) {
      this.router.navigate(['/home']).then();
      return;
    }
    this.gistService.hasGistScope()
      .subscribe(value => {
        if (value) {
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
        this.gistService.unsetToken();
        this.loading = false;
      });
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
