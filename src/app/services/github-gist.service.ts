import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubGistService {
  private token = '';
  isTokenValid = false;

  get Token(): string {
    return this.token;
  }

  constructor(private http: HttpClient) {
  }

  isTokenSet(): boolean {
    return this.token.length > 0;
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
        catchError(async (err) => false)
      );
  }
}
