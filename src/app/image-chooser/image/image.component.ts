import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() key: number;
  @Input() src;
  @Output() del = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  delete_image() {
    this.del.emit(this.key);
  }
}
