import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}

export class UserUpdateDto extends PartialType(CreateUserDto){}
