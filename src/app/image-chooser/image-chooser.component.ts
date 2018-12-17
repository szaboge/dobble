import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-chooser',
  templateUrl: './image-chooser.component.html',
  styleUrls: ['./image-chooser.component.scss']
})
export class ImageChooserComponent implements OnInit {
  srcs = [];
  maximum = 5;
  selected = 0;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  deleteImage(key: number) {
    this.srcs.splice(key, 1);
    this.selected = this.srcs.length;
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
      this.selected = this.srcs.length;
    };
    reader.readAsDataURL(file);
  }

  choosePicture() {
    this.fileInput.nativeElement.click();
  }
}
