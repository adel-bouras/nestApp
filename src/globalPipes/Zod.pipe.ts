import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class zodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: any) {
    const parsedValue = this.schema.safeParse(value);
    if (parsedValue.success) return value;
    throw new BadRequestException(parsedValue.error.format());
  }
}
