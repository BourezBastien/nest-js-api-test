import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AccountEntity } from 'src/account/models/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
