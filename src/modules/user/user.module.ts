import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserPublicController } from './controllers/user-public.controller'
import { UserController } from './controllers/user.controller'
import { UserLogic } from './logics/user.logic'
import { UserSchema } from './schemas/user.schema'
import { UserService } from './services/user.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [UserService, UserLogic],
  controllers: [UserController, UserPublicController],
  exports: [UserService, UserLogic]
})
export class UserModule {}
