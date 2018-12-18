import {Component, ElementRef, ViewChild} from '@angular/core';
import * as generator from 'dobble-generator';
import {Config} from './intefaces/config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stateC = 1;
  stateI = 1;

  config: Config = {symbols: 7, cards: 7, oneCard: 3};
  srcs = [];
  @ViewChild('dest') dest: ElementRef;
  canvases: Array<HTMLCanvasElement> = [];
  cards = [];

  generate() {
    this.cards = generator.generate(this.config.oneCard - 1);
    console.log(this.cards);
    for (let i = 0; i < this.cards.length; i++) {
      const can = this.createCanvas(500, 500);
      for (let j = 0; j < this.cards[i].length; j++) {
        this.insertImage(can, this.srcs[this.cards[i][j]],
          this.genRand(0, 500, 2),
          this.genRand(0, 500, 2),
          this.genRand(0, 360, 2),
          this.genRand(0.5, 2, 2));
      }
      this.canvases.push(can);
      this.dest.nativeElement.appendChild(can);
    }
  }

  insertImage(can: HTMLCanvasElement, src: string, posX: number, posY, degree: number, scale: number) {
    const ctx = can.getContext('2d');
    const image = this.createImage(src, degree, scale);
    const x = posX - image.width / 2;
    const y = posY - image.height / 2;
    ctx.drawImage(image, x, y);
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

  createImage(src: string, degree: number, scale: number): HTMLCanvasElement {
    const image = new Image();
    image.src = src;
    const maxSize = 100;

    const nH = image.height >= image.width ? maxSize : image.height / image.width * maxSize;
    const nW = image.width >= image.height ? maxSize : image.width / image.height * maxSize;

    const sX = nH / image.height;
    const sY = nW / image.width;

    const side = Math.sqrt(Math.pow(nW, 2) + Math.pow(nH, 2)) * scale;

    const canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.width = side;
    canvas.height = side;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degree * Math.PI / 180);
    ctx.scale(scale * sX, scale * sY);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    return canvas;
  }

  genRand(minN, maxN, decimalPlaces) {
    const rand = Math.random() * (maxN - minN) + minN;
    const power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
  }
}
