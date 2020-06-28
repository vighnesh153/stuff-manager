import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-styled-title',
  templateUrl: './styled-title.component.html',
  styleUrls: ['./styled-title.component.scss']
})
export class StyledTitleComponent implements OnInit {
  @Input() title = 'TITLE';
  @Input() displayAddNewButton = true;

  @Output() addNewEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  notifyListeners(): void {
    this.addNewEvent.emit();
    console.log('Opening a modal to add new item');
  }

}
