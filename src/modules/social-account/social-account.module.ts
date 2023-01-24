import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserAccountService } from '../user-account/services/user-account.service'
import { SocialUserController } from './controllers/social-account.controller'
import { SocialUserLogic } from './logics/social-account.logic'
import { SocialUserSchema } from './schemas/social-account.schema'
import { SocialAccountService } from './services/social-account.service'
import { UserAccountSchema } from '../user-account/schemas/user-account.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'socialuser', schema: SocialUserSchema },
      { name: 'useraccount', schema: UserAccountSchema }
    ])
  ],
  providers: [SocialAccountService, SocialUserLogic, UserAccountService],
  controllers: [SocialUserController],
  exports: [SocialAccountService, SocialUserLogic, UserAccountService]
})
export class SocialAccountModule {}
