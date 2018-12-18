import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-chooser',
  templateUrl: './image-chooser.component.html',
  styleUrls: ['./image-chooser.component.scss']
})
export class ImageChooserComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() srcs_emit = new EventEmitter<Array<string>>();

  progress = 0;
  progress_ = false;
  max_progress = 0;
  actual_progress = 0;

  state = 1;

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
    this.checkState();
  }

  changeListener(event) {
    this.initProgress(event.target.files.length);
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
      this.progressSetter();
      this.checkState();
    };
    reader.readAsDataURL(file);
  }

  initProgress(len: number) {
    this.progress_ = true;
    this.progress = 0;
    this.actual_progress = 0;
    this.max_progress = len;
  }

  progressSetter() {
    if (this.actual_progress < this.max_progress) {
      this.actual_progress++;
      this.progress = (this.actual_progress / this.max_progress) * 100;
    }
    if (this.max_progress === this.actual_progress) {
      this.progress_ = false;
    }

  }

  choosePicture() {
    this.fileInput.nativeElement.click();
  }

  checkState() {
    if (this.maximum === this.selected) {
      this.state = 0;
    } else if (this.maximum > this.selected) {
      this.state = 1;
    } else {
      this.state = 2;
    }
  }
}
