import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateUserDto,
  UserUpdateDto,
} from './dto/users.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
    updateUser(updateUserDto: UserUpdateDto, id: number) {
        const user = this.userRepository.create({ ...updateUserDto, id })
        return this.userRepository.createQueryBuilder()
            .update(user)
            .where("id = :id", { id: id })
            .execute()

    }
    async delete(id: number) {
        return this.userRepository.delete(id)
    }

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    async getAllUsers() {
        return await this.userRepository.find({ relations: ['notes'] })
    }

    async addUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create({ ...createUserDto })
        return this.userRepository.save(user)
    }
}
