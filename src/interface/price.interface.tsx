export enum CurrencyType {
  USD = "USD",
  SGD = "SGD",
  CNY = "CNY",
  KRW = "KRW",
  // Mention in document but no api for these currency
  // JPY = "JPY",
  // IDR = "IDR",
}

export interface IPrice {
  id: string;
  price: number;
  competitors?: object;
  taxes_and_fees?: {
    tax: number;
    hotel_fees: number;
  };
}
