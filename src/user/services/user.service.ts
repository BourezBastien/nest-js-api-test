import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { Client } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(client: Client): Observable<UserEntity> {
    return from(this.userRepository.save(client));
  }

  findAllUser(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  updateUser(id: string, client: Client): Observable<UpdateResult> {
    return from(this.userRepository.update(id, client));
  }

  deleteUser(id: string): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }
}
