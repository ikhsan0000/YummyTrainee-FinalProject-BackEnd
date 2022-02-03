import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 2021,
      username: 'root',
      password: '',
      database: 'react_native_fashion',
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    AuthModule,
    UserModule,
    ProductsModule,
    CartModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    AppService
  ],
})
export class AppModule {}
