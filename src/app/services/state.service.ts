import { Injectable } from '@angular/core';

import { StateHelperService } from 'src/app/services/state-helper.service';
import { WatchLaterStateService } from 'src/app/services/watch-later-state.service';
import { ProjectsStateService } from 'src/app/services/projects-state.service';
import { CourseIdeasStateService } from 'src/app/services/course-ideas-state.service';
import { TasksStateService } from 'src/app/services/tasks-state.service';
import { NoteStateService } from 'src/app/services/note-state.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private watchLater: WatchLaterStateService,
              private projectsState: ProjectsStateService,
              private courseIdeasState: CourseIdeasStateService,
              private tasksState: TasksStateService,
              private notesState: NoteStateService,
              private stateHelper: StateHelperService) {
  }

  saveToPersistentStore(): void {
    // TODO: store on Github Gist
    this.stateHelper.hasUpdates = false;
  }
}
