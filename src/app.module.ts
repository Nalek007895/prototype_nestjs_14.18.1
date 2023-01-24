import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { ErrorFilter } from './exception-filter/error.filter'
import { HttpExceptionFilter } from './exception-filter/http-exception.filter'
import { MongooseTransformers } from './interceptors/mongoose.transformer'
import { TransformInterceptor } from './interceptors/transfromer.interceptor'
import { AuthModule } from './modules/auth/auth.module'
import { DatabaseService } from './modules/database/database.service'
import { MongooseConfigService } from './modules/database/mongoose.config'
import { CounterSchema } from './modules/database/schemas/counter.schema'
import { SocialAccountModule } from './modules/social-account/social-account.module'
import { BusinessModule } from './modules/ubusiness/business.module'
import { UserAccountModule } from './modules/user-account/user-account.module'
import { UserModule } from './modules/user/user.module'
import { CamelizeKeysPipe } from './pipe/camelize-key.pipe'
import { CustomValidationPipe } from './pipe/custom-validation.pipe'

const AppProviders = [
  {
    provide: APP_PIPE,
    useClass: CamelizeKeysPipe
  },
  {
    provide: APP_PIPE,
    useClass: CustomValidationPipe
  },
  {
    provide: APP_FILTER,
    useClass: ErrorFilter
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  },
  DatabaseService,
  MongooseTransformers
]

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }]),
    AuthModule,
    UserModule,
    UserAccountModule,
    SocialAccountModule,
    BusinessModule
  ],
  controllers: [AppController],
  providers: [...AppProviders],
  exports: []
})
export class AppModule {}
