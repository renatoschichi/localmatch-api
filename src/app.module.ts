import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}