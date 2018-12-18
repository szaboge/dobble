import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  symbols = 0;
  oneCardSymbols = 0;
  cards = 0;

  state = 1;

  constructor() {
  }

  ngOnInit() {
    this.checkState();
  }

  checkInputs(type: string) {
    if (type === 'cards') {

    } else if (type === 'symbols') {

    } else if (type === 'card-symbols') {
      const n = this.oneCardSymbols - 1;
      this.cards = Math.pow(n, 2) + n + 1;
      this.symbols = this.cards;
    }
    this.checkState();
  }

  checkState() {
    if (this.oneCardSymbols > 1 && this.symbols > 1 && this.cards > 1) {
      this.state = 0;
    } else {
      this.state = 1;
    }
  }
}
