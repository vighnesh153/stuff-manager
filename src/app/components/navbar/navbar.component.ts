import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateHelperService } from 'src/app/services/state-helper.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  get hasUpdates(): boolean {
    return this.stateHelper.hasUpdates;
  }

  constructor(private router: Router,
              private stateService: StateService,
              private stateHelper: StateHelperService) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.router.navigate(['/auth']).then();
    }
  }

  saveData(): void {
    this.stateService.saveToPersistentStore();
  }

}
