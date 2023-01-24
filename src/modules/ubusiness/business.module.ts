import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { BusinessController } from './controllers/business.controller'
import { BusinessLogic } from './logics/business.logic'
import { BusinessSchema } from './schemas/business.schema'
import { BusinessService } from './services/business.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'business', schema: BusinessSchema }])
  ],
  providers: [BusinessService, BusinessLogic],
  controllers: [BusinessController],
  exports: [BusinessService, BusinessLogic]
})
export class BusinessModule {}
