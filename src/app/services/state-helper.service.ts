import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateHelperService {
  hasUpdates = false;
  dataArrivedSuccessfully = false;

  constructor() { }

  generateId(): string {
    return `${Date.now()}`;
  }
}
