import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AccountEntity } from 'src/account/models/account.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiBody({type: UserEntity})
  @ApiOperation({ summary: 'Create new user' })
  create(@Body() user: User): Observable<UserEntity> {
    return this.userService.createUser(user);
  }
  @Get()
  @ApiOperation({ summary: 'Find all users' })
  findAll(): Observable<UserEntity[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by is id' })
  findById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Get(':id/accounts')
  @ApiOperation({ summary: 'Find user bank account by is id' })
  findAccountByClientId(@Param('id') id: number): Promise<AccountEntity[]> {
    return this.userService.findAccountByClientId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by is id' })
  update(
    @Param('id') id: string,
    @Body() client: User,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, client);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by is id' })
  delete(@Param('id') id: string): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
