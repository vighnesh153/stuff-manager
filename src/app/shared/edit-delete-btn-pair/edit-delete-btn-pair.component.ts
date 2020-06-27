import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-delete-btn-pair',
  templateUrl: './edit-delete-btn-pair.component.html',
  styleUrls: ['./edit-delete-btn-pair.component.scss']
})
export class EditDeleteBtnPairComponent implements OnInit {
  @Input() iconSize = '18px';
  @Input() itemId = 'ITEM_ID';

  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickEdit(): void {
    this.editEvent.emit(this.itemId);
  }

  onClickDelete(): void {
    this.deleteEvent.emit(this.itemId);
  }

}
