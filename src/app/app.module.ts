import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './shared/modal/modal.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CourseIdeasComponent } from './components/course-ideas/course-ideas.component';
import { NotesComponent } from './components/notes/notes.component';
import { StyledTitleComponent } from './shared/styled-title/styled-title.component';
import { EditDeleteBtnPairComponent } from './shared/edit-delete-btn-pair/edit-delete-btn-pair.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    NavbarComponent,
    ModalComponent,
    WatchLaterComponent,
    ProjectsComponent,
    CourseIdeasComponent,
    NotesComponent,
    StyledTitleComponent,
    EditDeleteBtnPairComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
