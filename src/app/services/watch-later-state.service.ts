import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WatchLater } from 'src/app/models/watch-later';
import { StateHelperService } from 'src/app/services/state-helper.service';

@Injectable({
  providedIn: 'root'
})
export class WatchLaterStateService {
  private watchLaterList: WatchLater[] = [];
  public hasUpdates = new BehaviorSubject<null>(null);

  get getWatchLaterList(): WatchLater[] {
    return [...this.watchLaterList];
  }

  constructor(private stateHelper: StateHelperService) { }

  create(heading: string, url: string): void {
    this.watchLaterList.push({
      id: this.stateHelper.generateId(), heading, url
    });
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }

  update(id: string, heading: string, url: string): void {
    for (const item of this.watchLaterList) {
      if (item.id === id) {
        item.heading = heading;
        item.url = url;
      }
    }
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }

  remove(id: string): void {
    this.watchLaterList = this.watchLaterList.filter(item => item.id !== id);
    this.stateHelper.hasUpdates = true;
    this.hasUpdates.next(null);
  }
}
