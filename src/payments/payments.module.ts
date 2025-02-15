import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PayPalService } from './services/paypal.service'; // Cambiar por StripeService o MercadoPagoService si es necesario

@Module({
  providers: [
    PaymentsService,
    {
      provide: 'IPaymentProcessor',
      useClass: PayPalService, // Esto nos permite dinamismo y cambiar a futuro =D
    },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
