import {Component, OnInit} from '@angular/core';
import {DataStoreService} from '../data-store.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  size = {
    min: 200,
    max: 1000,
    value: 500,
    step: 1
  };
  scalemin = {
    min: 0.1,
    max: 10,
    value: 0.5,
    step: 0.1
  };
  scalemax = {
    min: 0.1,
    max: 10,
    value: 2,
    step: 0.1
  };
  distance = {
    min: 0,
    max: 1000,
    value: 125,
    step: 1
  };
  border = {
    min: 0,
    max: 25,
    value: 0,
    step: 0.1
  };
  transformsize = {
    min: 0,
    max: 1000,
    value: 100,
    step: 1
  };

  symbols = 7;
  cards = 7;
  oneCardSymbols = 3;
  state = 1;
  backgroundColor = '#A3D3E2';
  borderColor = '#000000';

  constructor(private dataStore: DataStoreService) {
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
      while (i < 20 && symbols <= this.symbols && this.symbols !== null) {
        i++;
        symbols = Math.pow(i, 2) + i + 1;
      }
      if (i !== 20 && this.symbols != null) {
        this.cards = Math.pow(i - 1, 2) + i;
        this.oneCardSymbols = i;
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
    } else {
      this.state = 1;
    }
    this.dataStore.configState.next({
      config: {
        symbols: this.symbols,
        cards: this.cards,
        oneCard: this.oneCardSymbols,
        symbol: {
          distance: this.distance.value,
          scalemin: this.scalemin.value,
          scalemax: this.scalemax.value,
          transformsize: this.transformsize.value
        },
        card: {
          width: this.size.value,
          height: this.size.value,
          borderWidth: this.border.value,
          borderColor: this.borderColor,
          backgroundColor: this.backgroundColor
        }
      }, state: this.state
    });
  }

  colorSelect($event, type: string) {
    if (type === 'background') {
      this.backgroundColor = $event;
    } else if (type === 'border') {
      this.borderColor = $event;
    }
    this.checkState();
  }
}
