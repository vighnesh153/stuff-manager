import { Injectable } from '@angular/core';
import { Project } from 'src/app/models/project';
import { StateHelperService } from 'src/app/services/state-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsStateService {
  private projects: Project[] = [];

  get getProjects(): Project[] {
    return [...this.projects];
  }

  constructor(private stateHelper: StateHelperService) { }

  create(title: string, additionalInfo: string): void {
    this.projects.push({
      id: this.stateHelper.generateId(), title, additionalInfo
    });
    this.stateHelper.hasUpdates = true;
  }

  update(id: string, title: string, additionalInfo: string): void {
    for (const item of this.projects) {
      if (item.id === id) {
        item.title = title;
        item.additionalInfo = additionalInfo;
      }
    }
    this.stateHelper.hasUpdates = true;
  }

  remove(id: string): void {
    this.projects = this.projects.filter(item => item.id !== id);
    this.stateHelper.hasUpdates = true;
  }
}
