import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AdminStrategy } from './passport/admin-stategy'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthLogic } from './logics/auth.logic'
import { ConfigModule } from '@nestjs/config'
import { UserAccountModule } from '../user-account/user-account.module'
import { SocialAccountModule } from '../social-account/social-account.module'
import { AuthSocialUserLogic } from './logics/auth-social-user.logic'

@Global()
@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UserModule,
    UserAccountModule,
    SocialAccountModule,
    JwtModule.register({
      secret: process.env.SECRET_ADMIN,
      signOptions: {
        expiresIn: '7d'
      }
    })
  ],
  controllers: [],
  providers: [AdminStrategy, AuthLogic, AuthSocialUserLogic],
  exports: [AuthLogic, AuthSocialUserLogic]
})
export class AuthModule {}
