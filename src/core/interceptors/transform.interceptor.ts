import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializer } from 'jsonapi-serializer';
import { Response } from '../interfaces/response-serializer.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  serializer: Serializer;
  constructor(serializer: Serializer) {
    this.serializer = serializer;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return this.serializer.serialize(data);
      }),
    );
  }
}
