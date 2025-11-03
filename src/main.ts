import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Documentação do Projeto - Articles API')
    .setDescription('Esta documentação apresenta os endpoints da API de Artigos, descrevendo suas funcionalidades, parâmetros e respostas esperadas. Antes de acessar qualquer endpoint, é necessário realizar a autenticação por meio do endpoint de login, obtendo um token JWT válido. Esse token deve ser incluído no cabeçalho das requisições subsequentes, garantindo o acesso autorizado aos recursos da API. Utilize esta documentação como guia para integrar, testar e consumir os serviços da API de forma segura e eficiente.')
    .setVersion('1.0')
    .addTag('articles')
    .addTag('auth')
    .addTag('permissions')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
