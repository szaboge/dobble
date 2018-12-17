import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-chooser',
  templateUrl: './image-chooser.component.html',
  styleUrls: ['./image-chooser.component.scss']
})
export class ImageChooserComponent implements OnInit {
  srcs = [];
  maximum = 5;

  constructor() {
  }

  ngOnInit() {
  }

  changeListener(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.createImage(event.target.files[i]);
    }
  }

  createImage(file: File) {
    const reader = new FileReader();
    reader.onload = e => {
      this.srcs.push(e.target['result']);
    };
    reader.readAsDataURL(file);
  }
}
