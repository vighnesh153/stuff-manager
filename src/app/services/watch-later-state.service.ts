import { Injectable } from '@angular/core';
import { WatchLater } from 'src/app/models/watch-later';
import { StateService } from 'src/app/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class WatchLaterStateService {
  private watchLaterList: WatchLater[] = [];

  get getWatchLaterList(): WatchLater[] {
    return [...this.watchLaterList];
  }

  constructor(private stateService: StateService) { }

  create(heading: string, url: string): void {
    this.watchLaterList.push({
      id: this.stateService.generateId(), heading, url
    });
    this.stateService.hasUpdates = true;
  }

  update(id: string, heading: string, url: string): void {
    for (const item of this.watchLaterList) {
      if (item.id === id) {
        item.heading = heading;
        item.url = url;
      }
    }
    this.stateService.hasUpdates = true;
  }

  remove(id: string): void {
    this.watchLaterList = this.watchLaterList.filter(item => item.id !== id);
    this.stateService.hasUpdates = true;
  }
}
