import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function start() {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: process.env.ACCESS_TOKEN_KEY,
      resave: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Nest Js App')
    .setDescription('Application for Educational Centers')
    .setVersion('1.0')
    .addTag('NestJs PostgreSQL GoogleAuth PassportJS etc...')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Listening on ${PORT} port ✅`);
  });
}
start();
