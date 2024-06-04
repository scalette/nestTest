import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import { CqrsModule } from '@nestjs/cqrs';
import { KillDragonHandler } from './commands/product.handlers';

@Module({
	controllers: [ProductController],
	imports: [
		CqrsModule,
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductModel,
				schemaOptions: {
					collection: 'Product'
				}
			}
		])
	],
	providers: [ProductService, KillDragonHandler]
})
export class ProductModule { }
