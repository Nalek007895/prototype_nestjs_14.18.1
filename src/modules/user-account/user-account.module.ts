import { Module } from '@nestjs/common/decorators'
import { MongooseModule } from '@nestjs/mongoose'
import { UserAccountController } from './controller/user-account.controller'
import { UserAccountLogic } from './logics/user-account.logic'
import { UserAccountSchema } from './schemas/user-account.schema'
import { UserAccountService } from './services/user-account.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'useraccount', schema: UserAccountSchema }
    ])
  ],
  providers: [UserAccountService, UserAccountLogic],
  controllers: [UserAccountController],
  exports: [UserAccountService, UserAccountLogic]
})
export class UserAccountModule {}
