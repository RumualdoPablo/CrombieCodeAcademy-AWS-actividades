import { Injectable } from '@nestjs/common';
import { ICreditCardProcessor } from '../interfaces/credit-card-processor.interface';

@Injectable()
export class StripeService implements ICreditCardProcessor {
  processCreditCardPayment(amount: number): string {
    return `Processed $${amount} via Stripe`;
  }
}
