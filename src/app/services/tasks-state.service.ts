import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { StateHelperService } from 'src/app/services/state-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStateService {
  private tasks: Task[] = [];

  get getTasks(): Task[] {
    return [...this.tasks];
  }

  constructor(private stateHelper: StateHelperService) { }

  create(heading: string, additionalInfo: string): void {
    this.tasks.push({
      id: this.stateHelper.generateId(), heading, additionalInfo
    });
    this.stateHelper.hasUpdates = true;
  }

  update(id: string, heading: string, additionalInfo: string): void {
    for (const item of this.tasks) {
      if (item.id === id) {
        item.heading = heading;
        item.additionalInfo = additionalInfo;
      }
    }
    this.stateHelper.hasUpdates = true;
  }

  remove(id: string): void {
    this.tasks = this.tasks.filter(item => item.id !== id);
    this.stateHelper.hasUpdates = true;
  }
}
