import { Injectable, Inject } from '@nestjs/common';
import { IPaymentProcessor } from './interfaces/payment-processor.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('IPaymentProcessor')
    private readonly paymentProcessor: IPaymentProcessor,
  ) {}

  process(amount: number): string {
    return this.paymentProcessor.processPayment(amount);
  }
}
