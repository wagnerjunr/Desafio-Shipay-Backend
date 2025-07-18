import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './database/prisma.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [PrismaModule, UserModule,RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
