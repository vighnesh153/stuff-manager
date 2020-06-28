import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/models/task';
import { TasksStateService } from 'src/app/services/tasks-state.service';

const DUMMY_TASK: Task = {
  id: '1111',
  content: 'Just for styling'
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  private hasUpdatesSubscription: Subscription;

  tasks: Task[] = [];
  isFormOpen = false;
  isUpdateMode = false;

  idItemUnderEdit = '';
  newContent = '';

  constructor(private tasksState: TasksStateService) { }

  ngOnInit(): void {
    this.hasUpdatesSubscription = this.tasksState.hasUpdates
      .subscribe(() => {
        this.tasks = this.tasksState.getTasks;
        if (environment.production === false) {
          this.tasks.push(DUMMY_TASK);
        }
      });
  }

  addNewItem(): void {
    this.isUpdateMode = false;
    this.newContent = '';
    this.isFormOpen = true;
  }

  createNew(): void {
    const content = this.newContent;
    this.tasksState.create(content);
    this.closeForm();
  }

  editItem(id: string): void {
    this.isUpdateMode = true;

    const item = this.tasks.filter(e => e.id === id)[0];
    this.newContent = item.content;
    this.idItemUnderEdit = item.id;

    this.isFormOpen = true;
  }

  storeEdits(): void {
    const id = this.idItemUnderEdit;
    const content = this.newContent;
    this.tasksState.update(id, content);
    this.closeForm();
  }

  deleteItem(id: string): void {
    this.tasksState.remove(id);
  }

  closeForm(): void {
    this.isFormOpen = false;
  }

  ngOnDestroy(): void {
    if (this.hasUpdatesSubscription) {
      this.hasUpdatesSubscription.unsubscribe();
    }
  }

}
