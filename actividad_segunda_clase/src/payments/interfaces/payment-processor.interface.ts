export interface IPaymentProcessor {
  processPayment(amount: number): string;
}
