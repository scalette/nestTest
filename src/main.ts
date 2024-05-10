import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WorkerService } from 'nestjs-graphile-worker';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.get(WorkerService).run()
	await app.listen(3000);
}
bootstrap();
