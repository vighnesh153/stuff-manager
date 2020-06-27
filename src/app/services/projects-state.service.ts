import { Injectable } from '@angular/core';
import { Project } from 'src/app/models/project';
import { StateService } from 'src/app/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsStateService {
  private projects: Project[] = [];

  get getProjects(): Project[] {
    return [...this.projects];
  }

  constructor(private stateService: StateService) { }

  create(title: string, additionalInfo: string): void {
    this.projects.push({
      id: this.stateService.generateId(), title, additionalInfo
    });
    this.stateService.hasUpdates = true;
  }

  update(id: string, title: string, additionalInfo: string): void {
    for (const item of this.projects) {
      if (item.id === id) {
        item.title = title;
        item.additionalInfo = additionalInfo;
      }
    }
    this.stateService.hasUpdates = true;
  }

  remove(id: string): void {
    this.projects = this.projects.filter(item => item.id !== id);
    this.stateService.hasUpdates = true;
  }
}
