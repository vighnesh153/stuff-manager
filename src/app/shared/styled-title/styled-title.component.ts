import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-styled-title',
  templateUrl: './styled-title.component.html',
  styleUrls: ['./styled-title.component.scss']
})
export class StyledTitleComponent implements OnInit {
  @Input() title = 'Title';

  constructor() { }

  ngOnInit(): void {
  }

}
