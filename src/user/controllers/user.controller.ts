import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { Client } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: Client): Observable<UserEntity> {
    return this.userService.createUser(user);
  }
  @Get()
  findAll(): Observable<UserEntity[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() client: Client,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, client);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
