import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../../account/models/account.entity';
import {  Repository, } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(client: User) {
    return this.userRepository.save(client);
  }

  findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(uuid: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { uuid } });
  }


  updateUser(id: string, client: User) {
    console.log(`UPDATE: User with id ${id} has been updated`);
    return this.userRepository.update(id, client);
  }

  deleteUser(id: string) {
    console.log(`DELETE: User with id ${id} has been deleted`);
    return this.userRepository.delete(id);
  }

  async findUsertByClientId(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { clientId:id } });
  }
  
}