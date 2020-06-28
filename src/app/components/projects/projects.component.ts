import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

import { Project } from 'src/app/models/project';
import { ProjectsStateService } from 'src/app/services/projects-state.service';

const DUMMY_PROJECT: Project = {
  id: '111',
  title: 'Just for styling',
  additionalInfo: 'This is the projects additional information.'
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private hasUpdatesSubscription: Subscription;

  projects: Project[] = [];
  isFormOpen = false;
  isUpdateMode = false;

  idItemUnderEdit = '';
  newTitle = '';
  newAdditionalInfo = '';

  constructor(private projectsState: ProjectsStateService) { }

  ngOnInit(): void {
    this.hasUpdatesSubscription = this.projectsState.hasUpdates
      .subscribe(() => {
        this.projects = this.projectsState.getProjects;
        if (environment.production === false) {
          this.projects.push(DUMMY_PROJECT);
        }
      });
  }

  addNewItem(): void {
    this.isUpdateMode = false;
    this.newTitle = '';
    this.newAdditionalInfo = '';
    this.isFormOpen = true;
  }

  createNew(): void {
    const title = this.newTitle;
    const additionalInfo = this.newAdditionalInfo;
    this.projectsState.create(title, additionalInfo);
    this.closeForm();
  }

  editItem(id: string): void {
    this.isUpdateMode = true;

    const item = this.projects.filter(e => e.id === id)[0];
    this.newTitle = item.title;
    this.newAdditionalInfo = item.additionalInfo;
    this.idItemUnderEdit = item.id;

    this.isFormOpen = true;
  }

  storeEdits(): void {
    const id = this.idItemUnderEdit;
    const title = this.newTitle;
    const additionalInfo = this.newAdditionalInfo;
    this.projectsState.update(id, title, additionalInfo);
    this.closeForm();
  }

  deleteItem(id: string): void {
    this.projectsState.remove(id);
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
