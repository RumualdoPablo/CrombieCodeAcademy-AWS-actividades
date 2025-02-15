import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [PrismaModule, ProductsModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
