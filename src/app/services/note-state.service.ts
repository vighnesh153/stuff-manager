import { Injectable } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  private note = '';

  get getNote(): string {
    return this.note;
  }

  constructor(private stateService: StateService) { }

  update(note: string): void {
    this.note = note;
    this.stateService.hasUpdates = true;
  }
}
