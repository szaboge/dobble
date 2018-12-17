import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-chooser',
  templateUrl: './image-chooser.component.html',
  styleUrls: ['./image-chooser.component.scss']
})
export class ImageChooserComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() srcs_emit = new EventEmitter<Array<string>>();

  maximum = 5;
  selected = 0;
  srcs: Array<string> = [];

  constructor() {
  }

  ngOnInit() {
  }

  deleteImage(key: number) {
    this.srcs.splice(key, 1);
    this.selected = this.srcs.length;
    this.srcs_emit.emit(this.srcs);
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
      this.srcs_emit.emit(this.srcs);
      this.selected = this.srcs.length;
    };
    reader.readAsDataURL(file);
  }

  choosePicture() {
    this.fileInput.nativeElement.click();
  }
}
