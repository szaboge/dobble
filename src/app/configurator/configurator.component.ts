import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Config} from '../intefaces/config.interface';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  @Output() config = new EventEmitter<Config>();
  @Output() stateOfConfig = new EventEmitter<number>();

  symbols = 7;
  cards = 7;
  oneCardSymbols = 3;
  state = 1;

  constructor() {
  }

  ngOnInit() {
    this.checkState();
  }

  checkInputs(type: string) {
    if (type === 'cards') {
      let i = 1;
      let cards = Math.pow(i, 2) + i + 1;
      while (i < 20 && cards < this.cards && this.cards !== null) {
        i++;
        cards = Math.pow(i, 2) + i + 1;
      }
      if (i !== 20 && this.cards != null) {
        this.symbols = cards;
        this.oneCardSymbols = i + 1;
      }
    } else if (type === 'symbols') {
      let i = 1;
      let symbols = Math.pow(i, 2) + i + 1;
      while (i < 20 && symbols < this.symbols && this.symbols !== null) {
        i++;
        symbols = Math.pow(i, 2) + i + 1;
      }
      if (i !== 20 && this.symbols != null) {
        this.cards = symbols;
        this.oneCardSymbols = i + 1;
      }

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
      this.config.emit({
        symbols: this.symbols,
        cards: this.cards,
        oneCard: this.oneCardSymbols
      });
    } else {
      this.state = 1;
    }
    this.stateOfConfig.emit(this.state);
  }
}
