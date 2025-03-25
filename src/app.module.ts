import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CognitoAuthController } from './cognito-auth/cognitoAuth.controller';
import { CognitoAuthModule } from './cognito-auth/cognitoAuth.module';
import { NotificationsGateway } from './websocket-example/notifications.gateway';
import { NotificationsModule } from './websocket-example/notifications.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    ItemsModule,
    UserModule,
    NotificationsModule,
    AuthModule,
    CognitoAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    S3Module,
  ],
  controllers: [],
  providers: [NotificationsGateway],
})
export class AppModule {}
