import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongoConfig';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import configuration from './configs/env/EnvironmentVariables';
import { validate } from './configs/env/EnvironmentVariables.validation';
import { GraphileModule } from './graphileWorker/graphileWorker.module';
import { MoviesModule } from './movies/movies.module';
@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			cache: true,
			validate,
		}),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		// AuthModule,
		// TopPageModule,
		MoviesModule,
		// ProductModule,
		// ReviewModule,
		// FilesModule,
		// SitemapModule,
		GraphileModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
