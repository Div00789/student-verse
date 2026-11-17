import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'studentverse-jwt-secret-key-2026',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [IdentityController],
  providers: [IdentityService, PrismaService, JwtAuthGuard],
  exports: [IdentityService, JwtModule, JwtAuthGuard],
})
export class IdentityModule {}
