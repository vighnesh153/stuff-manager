import { Component, OnInit } from '@angular/core';
import { NoteStateService } from 'src/app/services/note-state.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  content = '';

  constructor(private notesState: NoteStateService) { }

  ngOnInit(): void {
    this.content = this.notesState.getNote;
  }

  contentChange(): void {
    this.notesState.update(this.content);
  }

}
