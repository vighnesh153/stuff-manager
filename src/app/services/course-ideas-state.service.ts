import { Injectable } from '@angular/core';
import { CourseIdea } from 'src/app/models/course-idea';
import { StateService } from 'src/app/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class CourseIdeasStateService {
  private courseIdeas: CourseIdea[] = [];

  get getCourseIdeas(): CourseIdea[] {
    return [...this.courseIdeas];
  }

  constructor(private stateService: StateService) { }

  create(title: string, additionalInfo: string): void {
    this.courseIdeas.push({
      id: this.stateService.generateId(), title, additionalInfo
    });
    this.stateService.hasUpdates = true;
  }

  update(id: string, title: string, additionalInfo: string): void {
    for (const item of this.courseIdeas) {
      if (item.id === id) {
        item.title = title;
        item.additionalInfo = additionalInfo;
      }
    }
    this.stateService.hasUpdates = true;
  }

  remove(id: string): void {
    this.courseIdeas = this.courseIdeas.filter(item => item.id !== id);
    this.stateService.hasUpdates = true;
  }
}
