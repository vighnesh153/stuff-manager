import { Injectable } from '@angular/core';
import { StateHelperService } from 'src/app/services/state-helper.service';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  private note = '';

  get getNote(): string {
    return this.note;
  }

  constructor(private stateHelper: StateHelperService) { }

  update(note: string): void {
    this.note = note;
    this.stateHelper.hasUpdates = true;
  }
}
