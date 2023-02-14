import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './modules/item/item.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import ormConfig from './ormconfig';

@Module({
  imports: [
    AuthModule, 
    CoreModule, 
    UsersModule, 
    ItemModule, 
    TypeOrmModule.forRoot(ormConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
