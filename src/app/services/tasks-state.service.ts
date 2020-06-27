import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { StateService } from 'src/app/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStateService {
  private tasks: Task[] = [];

  get getTasks(): Task[] {
    return [...this.tasks];
  }

  constructor(private stateService: StateService) { }

  create(heading: string, additionalInfo: string): void {
    this.tasks.push({
      id: this.stateService.generateId(), heading, additionalInfo
    });
    this.stateService.hasUpdates = true;
  }

  update(id: string, heading: string, additionalInfo: string): void {
    for (const item of this.tasks) {
      if (item.id === id) {
        item.heading = heading;
        item.additionalInfo = additionalInfo;
      }
    }
    this.stateService.hasUpdates = true;
  }

  remove(id: string): void {
    this.tasks = this.tasks.filter(item => item.id !== id);
    this.stateService.hasUpdates = true;
  }
}
