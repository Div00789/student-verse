import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { IdentityModule } from './modules/identity/identity.module';
import { CoursesModule } from './modules/courses/courses.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { CredentialsModule } from './modules/credentials/credentials.module';
import { TalentModule } from './modules/talent/talent.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    IdentityModule,
    CoursesModule,
    RecruitmentModule,
    CredentialsModule,
    TalentModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

