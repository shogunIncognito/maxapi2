import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const allowedDomains = [
  'https://maxautos.vercel.app',
  'https://maxpanel.vercel.app',
  'https://panel-maxapp-pgrado-t3nc.vercel.app',
  'https://landing-page-maxautos-3xr7.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT') || 3000;

  const options = {
    origin: function (origin, callback) {
      if (allowedDomains.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  app.enableCors(options);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('MaxApp')
    .setDescription('The MaxApp API routes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(PORT);
}
bootstrap();
