import { Injectable } from '@nestjs/common';
import { IPaymentProcessor } from '../interfaces/payment-processor.interface';

@Injectable()
export class MercadoPagoService implements IPaymentProcessor {
  processPayment(amount: number): string {
    return `Processed $${amount} via MercadoPago`;
  }
}
