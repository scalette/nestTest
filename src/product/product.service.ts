import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';
import { CommandBus } from '@nestjs/cqrs';
import { ProductCreatedCommand } from './commands/productCreated.command';

@Injectable()
export class ProductService {
    //@ts-ignore
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>, private commandBus: CommandBus) { }
    async create(dto: CreateProductDto) {
        const product = await this.productModel.create(dto);
        this.commandBus.execute(
            new ProductCreatedCommand(product.id)
        )
        console.log('creating from service')
        return
    }

    async findById(id: string) {
        return this.productModel.findById(id).exec()
    }

    async deleteById(id: string) {
        return this.productModel.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    async findWithReviews(dto: FindProductDto) {
        return this.productModel.aggregate([
            {
                $match: {
                    categories: dto.category,
                }
            },
            {
                $sort: {
                    _id: 1,
                }
            },
            {
                $limit: dto.limit,
            },
            {
                $lookup: {
                    from: 'Review',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$reviews' },
                    avgRating: { $avg: '$reviews.rating' },
                    reviews: {
                        $function: {
                            body: `function (reviews) {
                reviews.sort((a, b) => new Date(a.createdAt) - new Date(a.createdAt))
                return reviews 
              }`,
                            args: ['$reviews'],
                            lang: 'js',
                        }
                    }
                }
            }
        ]).exec() as Promise<(ProductModel & { review: ReviewModel[], reviewCount: number, avgRating: number })[]>
    }
}
