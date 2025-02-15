import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ProductsModule, PaymentsModule],
})
export class AppModule {}
