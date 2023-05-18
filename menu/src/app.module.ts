import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfig } from './config/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
