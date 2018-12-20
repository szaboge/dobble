import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {saveAs} from '@progress/kendo-file-saver';
import * as generator from 'dobble-generator';
import * as JSZip from 'jszip';
import {Config} from '../intefaces/config.interface';
import {DataStoreService} from '../data-store.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  @ViewChild('dest') dest: ElementRef;
  config: Config;
  images: Array<string> = [];
  imageSources: Array<string> = [];
  automate = false;
  stateI = 1;
  stateC = 1;

  constructor(private dataStore: DataStoreService) {
  }

  ngOnInit() {
    this.dataStore.configState.subscribe((object) => {
      this.stateC = object.state;
      this.config = object.config;
      this.automateGeneration();
    });
    this.dataStore.imageState.subscribe((object) => {
      this.stateI = object.state;
      this.images = object.images;
      this.automateGeneration();
    });
  }

  generate() {
    this.imageSources = [];
    const cards = generator.generate(this.config.oneCard - 1);
    for (let i = 0; i < cards.length; i++) {
      const can = this.createCanvas(this.config.card.width, this.config.card.height);
      const positions = this.generatePositions();
      for (let j = 0; j < cards[i].length; j++) {
        this.insertImage(can, this.images[cards[i][j]],
          positions[j].x,
          positions[j].y,
          this.genRand(0, 360, 2),
          this.genRand(this.config.symbol.scalemin, this.config.symbol.scalemax, 2));
      }
      this.imageSources.push(can.toDataURL('image/png'));
    }
    this.dataStore.imageSources.next(this.imageSources);
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
    ctx.arc(width / 2, height / 2, width / 2 - this.config.card.borderWidth / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.config.card.backgroundColor;
    ctx.fill();
    if (this.config.card.borderWidth !== 0) {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = this.config.card.borderWidth;
      ctx.stroke();
    }
    return canvas;
  }

  createImage(src: string, degree: number, scale: number): HTMLCanvasElement {
    const image = new Image();
    image.src = src;
    const maxSize = this.config.symbol.transformsize;

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

  private generatePositions(): Array<{ x: number, y: number }> {
    const array: { x: number, y: number }[] = [];
    const len = this.config.oneCard;
    let degree = 0;
    const diff_from_center = this.config.card.height / 2 - this.config.symbol.distance;

    if (len < 4) {
      degree = (360 / len) * (Math.PI / 180);
      array.push({x: this.config.card.width / 2, y: diff_from_center});
      for (let i = 1; i < len; i++) {
        const last_vector = {...array[array.length - 1]};
        last_vector.x -= this.config.card.width / 2;
        last_vector.y -= this.config.card.height / 2;

        const newVector = {
          x: last_vector.x * Math.cos(degree) - last_vector.y * Math.sin(degree),
          y: last_vector.x * Math.sin(degree) + last_vector.y * Math.cos(degree)
        };
        newVector.x += this.config.card.width / 2;
        newVector.y += this.config.card.width / 2;
        array.push(newVector);
      }
    } else {
      degree = (360 / (len - 1)) * (Math.PI / 180);
      array.push({x: this.config.card.width / 2, y: this.config.card.height / 2});
      array.push({x: this.config.card.width / 2, y: diff_from_center});
      for (let i = 2; i < len; i++) {
        const last_vector = {...array[array.length - 1]};
        last_vector.x -= this.config.card.width / 2;
        last_vector.y -= this.config.card.height / 2;

        const newVector = {
          x: last_vector.x * Math.cos(degree) - last_vector.y * Math.sin(degree),
          y: last_vector.x * Math.sin(degree) + last_vector.y * Math.cos(degree)
        };
        newVector.x += this.config.card.width / 2;
        newVector.y += this.config.card.width / 2;
        array.push(newVector);
      }
    }

    return array;
  }

  download() {
    const jszip = new JSZip();
    for (let i = 0; i < this.imageSources.length; i++) {
      jszip.file(i + '.png', this.imageSources[i].split('base64,')[1], {base64: true});
    }
    jszip.generateAsync({type: 'blob'}).then(function (content) {
      saveAs(content, 'dobble.zip');
    });
  }

  automateGeneration() {
    if (this.automate && this.stateC === 0 && this.stateI === 0) {
      this.generate();
    }
  }
}
