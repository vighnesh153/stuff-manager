import { Injectable } from '@angular/core';

import { StateHelperService } from 'src/app/services/state-helper.service';
import { WatchLaterStateService } from 'src/app/services/watch-later-state.service';
import { ProjectsStateService } from 'src/app/services/projects-state.service';
import { CourseIdeasStateService } from 'src/app/services/course-ideas-state.service';
import { TasksStateService } from 'src/app/services/tasks-state.service';
import { NoteStateService } from 'src/app/services/note-state.service';
import { DbData } from 'src/app/models/db-data';
import { GithubGistService } from 'src/app/services/github-gist.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private watchLater: WatchLaterStateService,
              private projectsState: ProjectsStateService,
              private courseIdeasState: CourseIdeasStateService,
              private tasksState: TasksStateService,
              private notesState: NoteStateService,
              private stateHelper: StateHelperService,
              private gistService: GithubGistService) {
  }

  saveToPersistentStore(): void {
    const data: DbData = {
      notes: this.notesState.getNote,
      projects: this.projectsState.getProjects,
      tasks: this.tasksState.getTasks,
      watchLater: this.watchLater.getWatchLaterList,
      courseIdeas: this.courseIdeasState.getCourseIdeas
    };
    this.gistService.persistData(data)
      .subscribe(_ => {
        this.stateHelper.hasUpdates = false;
      });
  }
}
