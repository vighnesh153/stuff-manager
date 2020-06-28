import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WatchLaterStateService } from 'src/app/services/watch-later-state.service';
import { WatchLater } from 'src/app/models/watch-later';
import { environment } from 'src/environments/environment';

const DUMMY_WATCH_LATER: WatchLater = {
  id: '11111',
  heading: 'Just for styling.',
  url: 'url'
};

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit, OnDestroy {
  private hasUpdatesSubscription: Subscription;

  watchLaterList: WatchLater[] = [];
  isFormOpen = false;
  isUpdateMode = false;

  idItemUnderEdit = '';
  newHeading = '';
  newUrl = '';

  constructor(private watchLaterState: WatchLaterStateService) { }

  ngOnInit(): void {
    this.hasUpdatesSubscription = this.watchLaterState.hasUpdates
      .subscribe(() => {
        this.watchLaterList = this.watchLaterState.getWatchLaterList;
        if (environment.production === false) {
          this.watchLaterList.push(DUMMY_WATCH_LATER);
        }
      });
  }

  addNewItem(): void {
    this.isUpdateMode = false;
    this.newHeading = '';
    this.newUrl = '';
    this.isFormOpen = true;
  }

  createNew(): void {
    const heading = this.newHeading;
    const url = this.newUrl;
    this.watchLaterState.create(heading, url);
    this.closeForm();
  }

  editItem(id: string): void {
    this.isUpdateMode = true;

    const item = this.watchLaterList.filter(e => e.id === id)[0];
    this.newHeading = item.heading;
    this.newUrl = item.url;
    this.idItemUnderEdit = item.id;

    this.isFormOpen = true;
  }

  storeEdits(): void {
    const id = this.idItemUnderEdit;
    const heading = this.newHeading;
    const url = this.newUrl;
    this.watchLaterState.update(id, heading, url);
    this.closeForm();
  }

  deleteItem(id: string): void {
    this.watchLaterState.remove(id);
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
