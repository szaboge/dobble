export interface Config {
  symbols: number;
  cards: number;
  oneCard: number;
  symbol: {
    distance: number;
    scalemin: number;
    scalemax: number;
    transformsize: number;
  };
  card: {
    width: number;
    height: number;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
  };
}
