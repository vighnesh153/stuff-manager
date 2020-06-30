import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubGistService } from 'src/app/services/github-gist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-please-wait',
  templateUrl: './please-wait.component.html',
  styleUrls: ['./please-wait.component.scss']
})
export class PleaseWaitComponent implements OnInit {

  constructor(private router: Router,
              private gistService: GithubGistService) { }

  ngOnInit(): void {
    this.gistService.hasGistScope()
      .subscribe(hasGistScope => {
        if (hasGistScope) {
          localStorage.setItem(environment.auth.key, this.gistService.Token);
          this.gistService.isTokenValid = true;
          this.router.navigate(['/home']).then();
        } else {
          const params: { hasError?: boolean, needsLogin?: boolean } = {};
          if (this.gistService.Token.length > 0) {
            params.hasError = true;
          } else {
            params.needsLogin = true;
          }
          this.gistService.unsetToken();
          this.router.navigate(['/auth'],
            { queryParams: params }).then();
        }
      });
  }

}
