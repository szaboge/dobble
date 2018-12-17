import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  srcs = [];
  @ViewChild('dest') dest: ElementRef;
  canvases: Array<HTMLCanvasElement> = [];

  generate() {
    const can = this.createCanvas(500, 500);
    this.insertImage(can, this.srcs[0], 200, 200);
    this.canvases.push(can);
    this.dest.nativeElement.appendChild(can);
  }

  insertImage(can: HTMLCanvasElement, src: string, posX: number, posY) {
    const ctx = can.getContext('2d');
    ctx.drawImage(this.createImage(src, 90), posX, posY);
  }

  createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    return canvas;
  }

  createImage(src: string, degree: number): HTMLCanvasElement {
    const image = new Image();
    image.src = src;
    const canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degree * Math.PI / 180);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    ctx.restore();
    return canvas;
  }
}
