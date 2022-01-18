import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform,} from '@nestjs/common';
import {validate} from 'class-validator';
import {plainToClass} from 'class-transformer';

@Injectable()
export class InnerDataValidationPipe implements PipeTransform<any> {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const errorMessages = errors.map((error) => error.constraints);
            const message = Object.assign({}, ...errorMessages);
            const errorResponse = {
                statusCode: 400,
                error: 'Bad Request',
                message,
            };
            throw new BadRequestException(errorResponse);
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
