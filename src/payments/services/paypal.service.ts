import { Injectable } from '@nestjs/common';
import { IPayPalProcessor } from '../interfaces/paypal-processor.interface';

@Injectable()
export class PayPalService implements IPayPalProcessor {
  processPayPalPayment(amount: number): string {
    return `Processed $${amount} via PayPal`;
  }
}
