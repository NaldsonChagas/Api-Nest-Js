import { Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe {
  async transform (value: any, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Dados inválidos');
    }
    return value;
  }
}
