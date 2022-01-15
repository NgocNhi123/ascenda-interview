export enum CurrencyType {
  USD = "USD",
  SGD = "SGD",
  CNY = "CNY",
  KRW = "KRW",
}

export interface IPrice {
  id: string;
  price: string;
  competitors?: object;
  taxes_and_fees?: {
    tax: string;
    hotel_fees: string;
  };
}
