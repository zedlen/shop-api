import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NoAuthException } from './no-authorization.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;

    if (!headers.authorization) throw new NoAuthException();

    const [_, apiKey] = headers.authorization.split('token=');

    if (apiKey !== process.env.API_KEY) throw new NoAuthException();

    return true;
  }
}
