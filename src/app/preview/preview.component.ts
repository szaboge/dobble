import {Component, OnInit} from '@angular/core';
import {DataStoreService} from '../data-store.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  images: Array<string>;
  actual = 0;

  size = {
    min: 200,
    max: 1000,
    value: 400,
    step: 1
  };

  constructor(private dataStore: DataStoreService) {
  }

  ngOnInit() {
    this.dataStore.imageSources.subscribe((images) => {
      this.images = images;
      if (this.images.length === 0) {
        this.actual = 0;
      } else {
        this.actual = 1;
      }
    });
  }

  left() {
    if (this.actual - 1 < 1) {
      this.actual = this.images.length;
    } else {
      this.actual--;
    }
  }

  right() {
    if (this.actual + 1 > this.images.length) {
      this.actual = 1;
    } else {
      this.actual++;
    }
  }

  sizeChange() {

  }
}
