import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';
import { request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly ConfigService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    const JwtSecret = this.ConfigService.get<string>('SUPABASE_JWT');

     if (!JwtSecret) {
      return false; 
    }
    try {
      const decode = jwt.verify(token, JwtSecret);
      request['user'] = decode;      
      return true
    } catch (error) {
      return false; 
    }
  }
}