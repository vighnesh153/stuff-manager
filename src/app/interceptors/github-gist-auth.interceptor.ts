import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubGistService } from 'src/app/services/github-gist.service';

@Injectable()
export class GithubGistAuthInterceptor implements HttpInterceptor {

  constructor(private gistService: GithubGistService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.gistService.isTokenValid) {
      const modifiedRequest = request.clone({
        headers: request.headers.append('Authorization',
          `token ${this.gistService.Token}`)
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
