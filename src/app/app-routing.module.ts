import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { PleaseWaitComponent } from 'src/app/components/please-wait/please-wait.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HasChangesGuard } from 'src/app/guards/has-changes.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent,
    canActivate: [ AuthGuard ], canDeactivate: [ HasChangesGuard ] },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'auth', component: AuthComponent },
  { path: 'verifying', component: PleaseWaitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
