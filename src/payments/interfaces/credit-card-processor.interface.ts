export interface ICreditCardProcessor {
  processCreditCardPayment(amount: number): string;
}
