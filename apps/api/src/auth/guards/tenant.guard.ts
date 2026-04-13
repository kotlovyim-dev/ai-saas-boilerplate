import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const requestedTenantId =
      request.params?.tenantId || request.body?.tenantId;

    if (requestedTenantId && requestedTenantId !== user.tenantId) {
      throw new ForbiddenException("Cross-tenant access denied");
    }

    return true;
  }
}
