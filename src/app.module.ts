import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from "nestjs-typegoose";
import { getMongoConfig } from './configs/mongoConfig';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';
import { getPostgreConfig } from './configs/postgreConfig';
import { HelloTask } from './graphileWorker/jobs/hello.task';
import { HelloTaskListeners } from './graphileWorker/jobs/hello.listeners';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		GraphileWorkerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				connectionString: 'postgresql://admin:admin@localhost:5444/default',
				forbiddenFlags: ['hello'],
				schema: 'graphileWorkerNewSchema',
				concurrency: 3,
				taskList: {
					hello: HelloTask,
				},
			}),
		}),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		FilesModule,
		SitemapModule
	],
	controllers: [AppController],
	providers: [AppService, HelloTask, HelloTaskListeners],
})
export class AppModule { }
