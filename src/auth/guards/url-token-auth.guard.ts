import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class UrlTokenAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.query.token;

    console.log('🔍 Token recebido:', token);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido na URL');
    }

    try {
      const secret = process.env.JWT_SECRET || 'secretKey123';
      console.log('🔑 Secret usado:', secret);
      
      const payload = this.jwtService.verify(token, { secret });
      console.log('📝 Payload decodificado:', payload);
      
      const user = await this.usersService.findById(payload.sub);
      console.log('👤 Usuário encontrado:', user);
      
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      request.user = { userId: payload.sub, email: payload.email };
      console.log('✅ Usuário autenticado:', request.user);
      return true;
    } catch (error) {
      console.error('❌ Erro na validação do token:', error.message);
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}