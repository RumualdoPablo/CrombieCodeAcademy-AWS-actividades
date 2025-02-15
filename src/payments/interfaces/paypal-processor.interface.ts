export interface IPayPalProcessor {
  processPayPalPayment(amount: number): string;
}
