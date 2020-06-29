import { Injectable } from '@angular/core';
import { CourseIdea } from 'src/app/models/course-idea';
import { StateHelperService } from 'src/app/services/state-helper.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseIdeasStateService {
  private courseIdeas: CourseIdea[] = [];
  public hasUpdates = new BehaviorSubject<null>(null);

  get getCourseIdeas(): CourseIdea[] {
    return [...this.courseIdeas];
  }

  init(courseIdeas: CourseIdea[]): void {
    this.courseIdeas = courseIdeas;
  }

  constructor(private stateHelper: StateHelperService) { }

  create(title: string, additionalInfo: string): void {
    this.courseIdeas.push({
      id: this.stateHelper.generateId(), title, additionalInfo
    });
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }

  update(id: string, title: string, additionalInfo: string): void {
    for (const item of this.courseIdeas) {
      if (item.id === id) {
        item.title = title;
        item.additionalInfo = additionalInfo;
      }
    }
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }

  remove(id: string): void {
    this.courseIdeas = this.courseIdeas.filter(item => item.id !== id);
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }
}
