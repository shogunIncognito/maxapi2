import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/enums';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (request.user.role !== Role.admin)
      throw new UnauthorizedException(
        'You have no enough permissions to access this resource',
      );
    return true;
  }
}
