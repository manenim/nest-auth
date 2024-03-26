import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// auth/guards/jwt-auth.guard.ts

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}