import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { StateHelperService } from 'src/app/services/state-helper.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksStateService {
  private tasks: Task[] = [];
  public hasUpdates = new BehaviorSubject<null>(null);

  get getTasks(): Task[] {
    return [...this.tasks];
  }

  constructor(private stateHelper: StateHelperService) { }

  create(content: string): void {
    this.tasks.push({
      id: this.stateHelper.generateId(), content
    });
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }

  update(id: string, content: string): void {
    for (const item of this.tasks) {
      if (item.id === id) {
        item.content = content;
      }
    }
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }

  remove(id: string): void {
    this.tasks = this.tasks.filter(item => item.id !== id);
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }
}
