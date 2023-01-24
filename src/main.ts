import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import * as compression from 'compression'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RedocOptions, RedocModule } from 'nestjs-redoc'
import { urlencoded, json } from 'express'

async function documentBuilder(app: any) {
  const options = new DocumentBuilder()
    .setTitle('POS service api')
    .setDescription('POS service api.')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .addOAuth2()
    .addApiKey()
    .addCookieAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  const redocOptions: RedocOptions = {
    title: 'POS service api',
    // logo: {
    //   url: '<url>',
    //   backgroundColor: '#FAFAFA',
    //   altText: 'ava-logo'
    // },
    docName: 'POS-api',
    sortPropsAlphabetically: true,
    pathInMiddlePanel: true,
    hideDownloadButton: false,
    hideHostname: false,
    showExtensions: true,
    expandResponses: 'all',
    // favicon: '<url>',
    auth: {
      enabled: true,
      user: 'admin',
      password: 'qwerty1234@'
    }
  }
  await RedocModule.setup('/docs', app, document, redocOptions)
}

async function bootstrap() {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)
  await documentBuilder(app)
  app.use(helmet())
  app.use(compression())
  app.enableCors()
  app.use(json({ limit: '100mb' }))
  app.use(urlencoded({ extended: true, limit: '100mb' }))
  await app.listen(port)
}
bootstrap()
