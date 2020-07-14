import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { DbData } from 'src/app/models/db-data';
import { ProjectsStateService } from 'src/app/services/projects-state.service';
import { WatchLaterStateService } from 'src/app/services/watch-later-state.service';
import { TasksStateService } from 'src/app/services/tasks-state.service';
import { CourseIdeasStateService } from 'src/app/services/course-ideas-state.service';
import { NoteStateService } from 'src/app/services/note-state.service';
import { StateHelperService } from 'src/app/services/state-helper.service';

@Injectable({
  providedIn: 'root'
})
export class GithubGistService {
  private token = '';
  private gistId = '';
  private username = '';

  isTokenValid = false;

  get Token(): string {
    return this.token;
  }

  constructor(private http: HttpClient,
              private projectsState: ProjectsStateService,
              private watchLaterState: WatchLaterStateService,
              private tasksState: TasksStateService,
              private courseIdeasState: CourseIdeasStateService,
              private notesState: NoteStateService,
              private stateHelper: StateHelperService) {
    this.checkInLocalStorage();
  }

  private static dbBody(): {} {
    const emptyContent: DbData = {
      notes: '',
      projects: [],
      tasks: [],
      watchLater: [],
      courseIdeas: []
    };
    return {
      [environment.dbInfo.introFileName]: {
        content: 'This is the persistent store for the STUFF-MANAGER app. ' +
          'Don\'t delete this.'
      },
      [environment.dbInfo.dataFileName]: {
        content: JSON.stringify(emptyContent)
      }
    };
  }

  private checkInLocalStorage(): void {
    const token = localStorage.getItem(environment.auth.key);
    if (token !== null) {
      this.setToken(token);
    }
  }

  unsetToken(): void {
    this.isTokenValid = false;
    this.setToken('');
    localStorage.removeItem(environment.auth.key);
  }

  setToken(token: string): void {
    this.token = token;
  }

  hasGistScope(): Observable<boolean> {
    const url = environment.githubRateLimit;
    const headers = new HttpHeaders({
      Authorization: `token ${this.token}`
    });
    return this.http.get(url, {observe: 'response', headers})
      .pipe(
        map(
          response => {
            const scope = response.headers.get('X-OAuth-Scopes');
            return scope.includes('gist');
          }
        ),
        catchError(async _ => false)
      );
  }

  persistData(data: DbData): Observable<any> {
    const url = `${environment.githubGists}/${this.gistId}`;
    const body = {
      files: {
        [environment.dbInfo.dataFileName]: {
          content: JSON.stringify(data)
        }
      }
    };
    return this.http.post(url, body)
      .pipe(take(1));
  }

  async appInitializer(): Promise<Observable<DbData>> {
    return (await this.initializeApp());
  }

  setData(data: DbData): void {
    this.projectsState.init(data.projects);
    this.watchLaterState.init(data.watchLater);
    this.courseIdeasState.init(data.courseIdeas);
    this.tasksState.init(data.tasks);
    this.notesState.init(data.notes);
    this.stateHelper.dataArrivedSuccessfully = true;
  }

  private async initializeApp(): Promise<Observable<DbData>> {
    const gistIdObservable = await this.getGistId().toPromise();
    this.gistId = await gistIdObservable.toPromise();
    const latestCommit = await this.getLatestCommit().toPromise();
    const corsPrefix = environment.corsAnywhere;
    // const corsPrefix = '';
    const rawDataUrl = `${corsPrefix}` +
        `https://gist.githubusercontent.com/${this.username}` +
      `/${this.gistId}/raw/${latestCommit}/data.json`;

    return this.http.get(rawDataUrl)
      .pipe(map((data: DbData) => data));
  }

  private getLatestCommit(): Observable<string> {
    const url = `${environment.githubGists}/${this.gistId}?abc=${Math.random()}`;
    return this.http.get(url)
      .pipe(map((response: { history: { version: string }[] }) => {
        const latestCommit = response.history[0];
        return latestCommit.version;
      }));
  }

  private getGistId(): Observable<Observable<string>> {
    return this.hasGistDb().pipe(
      map(
        hasGistDb => {
          if (hasGistDb === false) {
            const body = { files: GithubGistService.dbBody() };
            return this.http.post(environment.githubGists, body)
              .pipe(map((response: { id: string, owner: { login: string } }) => {
                this.username = response.owner.login;
                return response.id;
              }));
          } else {
            return of(this.gistId);
          }
        }
      )
    );
  }

  private hasGistDb(): Observable<boolean> {
    return this.http.get(environment.githubGists)
      .pipe(
        map(
          (gists: { files: {}, id: string, owner: { login: string } }[]) => {
            for (const gist of gists) {
              const fileNames = Object.keys(gist.files);
              if (fileNames.length === 2) {
                const intro = environment.dbInfo.introFileName;
                const data = environment.dbInfo.dataFileName;
                if (fileNames.includes(intro) && fileNames.includes(data)) {
                  this.gistId = gist.id;
                  this.username = gist.owner.login;
                  return true;
                }
              }
            }
            return false;
          }
        )
      );
  }
}
