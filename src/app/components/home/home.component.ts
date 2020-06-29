import { Component, OnInit } from '@angular/core';
import { GithubGistService } from 'src/app/services/github-gist.service';
import { CanComponentDeactivate } from 'src/app/guards/has-changes.guard';
import { Observable } from 'rxjs';
import { StateHelperService } from 'src/app/services/state-helper.service';
import { DbData } from 'src/app/models/db-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, CanComponentDeactivate {
  loading = true;
  errorOccurred = false;

  constructor(private gistService: GithubGistService,
              private stateHelper: StateHelperService) { }

  ngOnInit(): void {
    (async () => {
      try {
        const initializer = await this.gistService.appInitializer();
        const dbData: DbData = await initializer.toPromise();
        this.gistService.setData(dbData);
      } catch (e) {
        this.errorOccurred = true;
      }
      this.loading = false;
    })();
  }

  canComponentDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.stateHelper.hasUpdates === false) {
      this.gistService.isTokenValid = false;
      return true;
    }
    if (confirm('Changes have not been saved. ' +
      'Do you want to discard the changes?')) {
      this.gistService.isTokenValid = false;
      return true;
    }
    return false;
  }

}
