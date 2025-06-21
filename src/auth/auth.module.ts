import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UrlTokenAuthGuard } from './guards/url-token-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule, // Adicionar ConfigModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, UrlTokenAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, UrlTokenAuthGuard],
})
export class AuthModule {}