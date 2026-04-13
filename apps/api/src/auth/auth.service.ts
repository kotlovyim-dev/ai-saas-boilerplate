import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { RegisterDto, LoginDto } from "./dto";
import { JwtPayload } from "./strategies/jwt.strategy";
import { Prisma } from "@ai-saas/db";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 12);

    try {
      const { tenant, user } = await this.prisma.$transaction(async (tx) => {
        const tenant = await tx.tenant.create({
          data: { name: dto.organizationName },
        });
        const user = await tx.user.create({
          data: {
            email: dto.email,
            passwordHash,
            role: "OWNER",
            tenantId: tenant.id,
          },
        });
        return { tenant, user };
      });

      const tokens = await this.generateTokens(
        user.id,
        tenant.id,
        user.role,
        user.email,
      );

      return {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          tenantId: tenant.id,
        },
      };
    } catch (e: unknown) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("Email already in use");
      }
      throw e;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) throw new UnauthorizedException("Invalid credentials");

    const tokens = await this.generateTokens(
      user.id,
      user.tenantId,
      user.role,
      user.email,
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      },
    };
  }

  async refresh(rawRefreshToken: string) {
    const tokenRecord = await this.findTokenWithUser(rawRefreshToken);
    if (!tokenRecord) throw new UnauthorizedException("Invalid refresh token");

    await this.prisma.refreshToken.delete({
      where: { id: tokenRecord.id },
    });

    const { user } = tokenRecord;
    const tokens = await this.generateTokens(
      user.id,
      user.tenantId,
      user.role,
      user.email,
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      },
    };
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  private async generateTokens(
    userId: string,
    tenantId: string,
    role: string,
    email: string,
  ) {
    const payload: JwtPayload = { sub: userId, tenantId, role, email };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: "15m",
    });

    const rawRefreshToken = randomBytes(64).toString("hex");
    const tokenHash = await bcrypt.hash(rawRefreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.prisma.refreshToken.create({
      data: { tokenHash, userId, tenantId, expiresAt },
    });

    return { accessToken, refreshToken: rawRefreshToken };
  }

  private async findTokenWithUser(rawToken: string) {
    const tokens = await this.prisma.refreshToken.findMany({
      where: { expiresAt: { gt: new Date() } },
      include: { user: true },
    });

    for (const token of tokens) {
      const match = await bcrypt.compare(rawToken, token.tokenHash);
      if (match) return token;
    }

    return null;
  }
}
