import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateHelperService {
  hasUpdates = false;

  constructor() { }

  generateId(): string {
    return `${Date.now()}`;
  }
}
