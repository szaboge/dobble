import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  src;
  srcs = [];

  changeListener(event) {
    this.createImage(event.target.files[0]);
    this.createImage(event.target.files[1]);
    this.createImage(event.target.files[2]);
  }

  createImage(file: File) {
    const reader = new FileReader();
    reader.onload = e => {
      this.srcs.push(e.target['result']);
    };
    reader.readAsDataURL(file);
  }
}
