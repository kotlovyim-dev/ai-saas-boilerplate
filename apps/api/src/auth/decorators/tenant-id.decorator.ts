import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const TenantId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string =>
    ctx.switchToHttp().getRequest().user.tenantId,
);
