import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseIdea } from 'src/app/models/course-idea';
import { CourseIdeasStateService } from 'src/app/services/course-ideas-state.service';
import { environment } from 'src/environments/environment';

const DUMMY_COURSE = {
  id: '1111',
  title: 'Just for styling',
  additionalInfo: 'THIS CAN\'T BE EDITED OR DELETED BECAUSE IT IS NOT IN STATE. ' +
    'Lorem ipsum dolor sit amet, consectetur adipisicing ' +
    'elit. Doloremque doloribus eligendi eveniet harum modi neque provident ' +
    'ratione temporibus voluptatum? Accusamus aperiam asperiores at ' +
    'cupiditate eos omnis quae totam vitae voluptatum?'
};

@Component({
  selector: 'app-course-ideas',
  templateUrl: './course-ideas.component.html',
  styleUrls: ['./course-ideas.component.scss']
})
export class CourseIdeasComponent implements OnInit, OnDestroy {
  private hasUpdatesSubscription: Subscription;

  courseIdeas: CourseIdea[] = [];
  isFormOpen = false;
  isUpdateMode = false;

  idItemUnderEdit = '';
  newTitle = '';
  newAdditionalInfo = '';

  constructor(private courseIdeasState: CourseIdeasStateService) { }

  ngOnInit(): void {
    this.hasUpdatesSubscription = this.courseIdeasState.hasUpdates
      .subscribe(() => {
        this.courseIdeas = this.courseIdeasState.getCourseIdeas;
        if (environment.production === false) {
          this.courseIdeas.push(DUMMY_COURSE);
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
    this.courseIdeasState.create(title, additionalInfo);
    this.closeForm();
  }

  editItem(id: string): void {
    this.isUpdateMode = true;

    const item = this.courseIdeas.filter(e => e.id === id)[0];
    this.newTitle = item.title;
    this.newAdditionalInfo = item.additionalInfo;
    this.idItemUnderEdit = item.id;

    this.isFormOpen = true;
  }

  storeEdits(): void {
    const id = this.idItemUnderEdit;
    const title = this.newTitle;
    const additionalInfo = this.newAdditionalInfo;
    this.courseIdeasState.update(id, title, additionalInfo);
    this.closeForm();
  }

  deleteItem(id: string): void {
    this.courseIdeasState.remove(id);
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
