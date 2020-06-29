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
    if (this.gistService.isTokenSet() === false) {
      this.checkInLocalStorage();
    }
    this.gistService.hasGistScope()
      .subscribe(hasGistScope => {
        if (hasGistScope) {
          localStorage.setItem(environment.auth.key, this.gistService.Token);
          this.gistService.isTokenValid = true;
          this.router.navigate(['/home']).then();
        } else {
          this.gistService.isTokenValid = false;
          this.gistService.setToken('');
          localStorage.removeItem(environment.auth.key);
          this.router.navigate(['/auth'], {
            queryParams: {
              needsLogin: true
            }
          }).then();
        }
      });
  }

  checkInLocalStorage(): void {
    const token = localStorage.getItem(environment.auth.key);
    if (token !== null) {
      this.gistService.setToken(token);
    }
  }

}
