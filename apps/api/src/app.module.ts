import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';
import { IdentityModule } from './modules/identity/identity.module';
import { CoursesModule } from './modules/courses/courses.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { CredentialsModule } from './modules/credentials/credentials.module';
import { TalentModule } from './modules/talent/talent.module';
import { StorageModule } from './modules/storage/storage.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    IdentityModule,
    StudentModule,
    CoursesModule,
    RecruitmentModule,
    CredentialsModule,
    TalentModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
