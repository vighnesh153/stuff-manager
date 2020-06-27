import { Injectable } from '@angular/core';

import { WatchLaterStateService } from 'src/app/services/watch-later-state.service';
import { ProjectsStateService } from 'src/app/services/projects-state.service';
import { CourseIdeasStateService } from 'src/app/services/course-ideas-state.service';
import { TasksStateService } from 'src/app/services/tasks-state.service';
import { NoteStateService } from 'src/app/services/note-state.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  hasUpdates = false;

  constructor(private watchLater: WatchLaterStateService,
              private projectsState: ProjectsStateService,
              private courseIdeasState: CourseIdeasStateService,
              private tasksState: TasksStateService,
              private notesState: NoteStateService) {
  }

  saveToPersistentStore(): void {
    // TODO: store on Github Gist
    this.hasUpdates = false;
  }

  generateId(): string {
    return `${Date.now()}`;
  }
}
